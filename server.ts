import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. AI Creator Matching Endpoint
app.post('/api/match-creators', async (req, res) => {
  try {
    const { requirement, budget, timeline, creators = [] } = req.body;

    if (!requirement || typeof requirement !== 'string') {
      return res.status(400).json({ error: 'Requirement text is required' });
    }

    if (ai) {
      try {
        const creatorProfilesSummary = creators.map((c: any) => ({
          id: c.id,
          name: c.name,
          discipline: c.discipline,
          title: c.title,
          rate: c.rate,
          availability: c.availability,
          skills: c.skills,
          topWork: c.portfolioItems?.map((p: any) => p.title + ' (' + p.category + ')').join(', '),
          bio: c.bio,
        }));

        const prompt = `You are the matching intelligence engine for SkillBridge AI (a premium content creator marketplace).
A client provided the following project requirements:
"${requirement}"
Budget specified: ${budget || 'Flexible / Not strictly set'}
Timeline specified: ${timeline || 'Flexible'}

Available creators on the platform:
${JSON.stringify(creatorProfilesSummary, null, 2)}

Tasks:
1. Identify the client's core needs: primary discipline(s), aesthetic/tone, key technical requirements, budget and timeline feasibility.
2. Select the top matching creators (up to 4) ranked by suitability.
3. For each creator, provide:
   - matchScore: integer from 70 to 98 based on fit
   - whyGoodMatch: a 2-3 sentence personalized explanation of why this creator is an exceptional fit (referencing their specific skills, past work, rate compatibility, or aesthetic)
   - keyFitStrengths: list of 3 concise bullet points (e.g., "Extensive commercial reel experience", "Available for immediate start", "Within budget target")
   - budgetVerdict: evaluation of their rate vs client budget ("Ideal budget fit", "Premium tier - worth the investment", "Budget-friendly option")

Respond with JSON adhering to the specified schema.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                analysis: {
                  type: Type.OBJECT,
                  properties: {
                    clientNeedsSummary: { type: Type.STRING },
                    identifiedDisciplines: { type: Type.ARRAY, items: { type: Type.STRING } },
                    aestheticTone: { type: Type.STRING },
                    timelineAssessment: { type: Type.STRING },
                    budgetViability: { type: Type.STRING },
                  },
                  required: ['clientNeedsSummary', 'identifiedDisciplines', 'aestheticTone', 'timelineAssessment', 'budgetViability'],
                },
                matches: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      creatorId: { type: Type.STRING },
                      matchScore: { type: Type.INTEGER },
                      whyGoodMatch: { type: Type.STRING },
                      keyFitStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                      budgetVerdict: { type: Type.STRING },
                    },
                    required: ['creatorId', 'matchScore', 'whyGoodMatch', 'keyFitStrengths', 'budgetVerdict'],
                  },
                },
              },
              required: ['analysis', 'matches'],
            },
          },
        });

        const data = JSON.parse(response.text || '{}');
        return res.json({ success: true, data, source: 'gemini' });
      } catch (geminiError) {
        console.warn('Gemini matching error, using algorithmic fallback:', geminiError);
      }
    }

    // Heuristic Fallback matching
    const reqLower = requirement.toLowerCase();
    const ranked = creators.map((c: any) => {
      let score = 75;
      const matchingSkills = c.skills.filter((s: string) => reqLower.includes(s.toLowerCase()));
      score += matchingSkills.length * 5;
      if (reqLower.includes(c.discipline.toLowerCase().replace('_', ' '))) score += 10;
      if (c.availability === 'Available Now') score += 5;
      score = Math.min(98, Math.max(72, score));

      return {
        creatorId: c.id,
        matchScore: score,
        whyGoodMatch: `${c.name} is an ideal match for your brief. With specialized expertise in ${c.skills.slice(0, 3).join(', ')} and a verified production background, their aesthetic seamlessly bridges your creative goals with timely delivery.`,
        keyFitStrengths: [
          `Mastery in ${c.skills[0] || 'Core Production'}`,
          `${c.availability} for projects`,
          `Competitive rate at $${c.rate}/hr within expectations`,
        ],
        budgetVerdict: 'Budget-aligned professional match',
      };
    }).sort((a: any, b: any) => b.matchScore - a.matchScore).slice(0, 4);

    return res.json({
      success: true,
      data: {
        analysis: {
          clientNeedsSummary: `Identified focus on content production and creative deliverables from your brief: "${requirement.slice(0, 100)}..."`,
          identifiedDisciplines: ['Video Editing', 'Creative Direction'],
          aestheticTone: 'Modern, high-retention commercial aesthetic',
          timelineAssessment: timeline || 'Standard turnaround timeframe estimated (1-3 weeks)',
          budgetViability: budget ? `Budget allocated: ${budget}` : 'Flexible budget range accommodates standard market rates',
        },
        matches: ranked,
      },
      source: 'heuristic',
    });
  } catch (error: any) {
    console.error('Match creators route error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 2. AI Creator Profile Generator Endpoint
app.post('/api/generate-creator-profile', async (req, res) => {
  try {
    const { discipline, rawExperience, equipmentOrTools, sampleLinksOrTopics } = req.body;

    if (!discipline) {
      return res.status(400).json({ error: 'Discipline is required' });
    }

    if (ai) {
      try {
        const prompt = `You are a high-end creative agency talent agent. Generate a standout, professional profile for a content creator.
Discipline: ${discipline}
Experience / Background: ${rawExperience || 'Professional creator with multiple years of client and independent project experience'}
Equipment / Software Stack: ${equipmentOrTools || 'Industry standard production tools'}
Sample Works / Focus: ${sampleLinksOrTopics || 'Commercials, digital campaigns, social content'}

Create:
1. headline: High-impact 1-line professional title (e.g. "Senior Colorist & Commercial Video Editor | Narrative & Campaign Finishing")
2. bio: 2 short paragraphs emphasizing craftsmanship, client results, and aesthetic signature.
3. skillTags: array of 6 distinct technical and creative skills.
4. elevatorPitch: 1 punchy sentence for client match summaries.
5. servicePackages: 3 realistic tiered offerings (Starter, Growth, Master Production) with packageTitle, turnaround, deliverableSummary, and suggestedRate.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                bio: { type: Type.STRING },
                skillTags: { type: Type.ARRAY, items: { type: Type.STRING } },
                elevatorPitch: { type: Type.STRING },
                servicePackages: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      packageTitle: { type: Type.STRING },
                      turnaround: { type: Type.STRING },
                      deliverableSummary: { type: Type.STRING },
                      suggestedRate: { type: Type.STRING },
                    },
                    required: ['packageTitle', 'turnaround', 'deliverableSummary', 'suggestedRate'],
                  },
                },
              },
              required: ['headline', 'bio', 'skillTags', 'elevatorPitch', 'servicePackages'],
            },
          },
        });

        const data = JSON.parse(response.text || '{}');
        return res.json({ success: true, data, source: 'gemini' });
      } catch (err) {
        console.warn('Gemini profile generation error:', err);
      }
    }

    // Fallback profile
    return res.json({
      success: true,
      data: {
        headline: `Lead ${discipline.replace('_', ' ')} & Creative Finisher`,
        bio: `Specializing in high-retention creative assets, I combine deep technical command with an instinctive eye for pacing and storytelling. Over years of collaboration with brands and creators, my approach prioritizes emotional connection and spotless technical execution.\n\nFrom pre-production moodboards to master exports, every asset is calibrated for audience engagement and brand longevity.`,
        skillTags: ['Creative Direction', 'Color Science', 'Pacing & Rhythm', 'Multi-Platform Master', 'Asset Finishing', 'Story Architecture'],
        elevatorPitch: `Transforming creative briefs into compelling, high-converting visual and narrative assets.`,
        servicePackages: [
          {
            packageTitle: 'Sprint Sprint Asset',
            turnaround: '48-72 hours',
            deliverableSummary: 'Single high-impact master deliverable with 1 revision round.',
            suggestedRate: '$450',
          },
          {
            packageTitle: 'Campaign Package',
            turnaround: '1-2 weeks',
            deliverableSummary: 'Multi-asset campaign rollout, native formats & sound/color pass.',
            suggestedRate: '$1,800',
          },
          {
            packageTitle: 'Full Production Partnership',
            turnaround: '3-4 weeks',
            deliverableSummary: 'End-to-end creative direction, comprehensive deliverables & source files.',
            suggestedRate: '$4,500',
          },
        ],
      },
      source: 'heuristic',
    });
  } catch (error: any) {
    console.error('Profile generation error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 3. AI Project Brief Assistant Endpoint
app.post('/api/generate-project-brief', async (req, res) => {
  try {
    const { roughIdea, discipline, targetBudget } = req.body;

    if (!roughIdea) {
      return res.status(400).json({ error: 'Rough idea is required' });
    }

    if (ai) {
      try {
        const prompt = `As an elite executive producer, transform this raw client request into an actionable, professional project brief for content creators:
Idea: "${roughIdea}"
Target discipline: ${discipline || 'General Content Creator'}
Estimated budget: ${targetBudget || 'Not specified'}

Generate:
1. title: Clean, descriptive project title
2. summary: 2-sentence executive summary
3. deliverables: array of 3-5 specific tangible deliverables (e.g., "3x 9:16 vertical edits with captions", "1x 4K master color pass")
4. aestheticDirection: description of visual mood, lighting, pacing, or tone
5. estimatedTimelineDays: realistic days needed (integer)
6. recommendedBudgetRange: e.g. "$1,500 - $2,500"`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
                aestheticDirection: { type: Type.STRING },
                estimatedTimelineDays: { type: Type.INTEGER },
                recommendedBudgetRange: { type: Type.STRING },
              },
              required: ['title', 'summary', 'deliverables', 'aestheticDirection', 'estimatedTimelineDays', 'recommendedBudgetRange'],
            },
          },
        });

        const data = JSON.parse(response.text || '{}');
        return res.json({ success: true, data, source: 'gemini' });
      } catch (err) {
        console.warn('Gemini brief generator fallback:', err);
      }
    }

    return res.json({
      success: true,
      data: {
        title: 'Commercial Creator Campaign Deliverable',
        summary: `Refining your creative direction into an impactful suite of high-retention deliverables designed for audience conversion.`,
        deliverables: [
          'High-resolution Master Cut in native aspect ratios',
          'Platform-optimized vertical cutdowns with captions',
          'Full color-graded photo/video source stills package',
          'Sound design pass and mixed audio stem exports',
        ],
        aestheticDirection: 'Sophisticated dark slate tones, cinematic anamorphic lighting, and purposeful rhythm.',
        estimatedTimelineDays: 14,
        recommendedBudgetRange: targetBudget || '$1,500 - $3,000',
      },
      source: 'heuristic',
    });
  } catch (error: any) {
    console.error('Project brief route error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 4. AI Work Analyzer & Automated Portfolio Builder Endpoint
app.post('/api/analyze-and-build-portfolio', async (req, res) => {
  try {
    const { creatorName, discipline, workTitle, workDescription, fileMetadata, toolsUsed } = req.body;

    if (!workTitle || !discipline) {
      return res.status(400).json({ error: 'workTitle and discipline are required' });
    }

    if (ai) {
      try {
        const prompt = `You are the Master Creative Director and Talent Assessor at SkillBridge AI.
A creator has uploaded their recent work to be analyzed:
Creator: ${creatorName || 'Anonymous Creator'}
Discipline: ${discipline}
Work Title: "${workTitle}"
Work Description / Content / Scope: "${workDescription || 'High production creative asset'}"
Uploaded File / Deliverables Info: "${fileMetadata || 'Master visual / audio asset export'}"
Tools & Software Used: "${toolsUsed || 'Industry standard production tools'}"

Analyze this work in depth and build their official portfolio and creator ranking:
1. portfolioItem:
   - title: Refined commercial case study title
   - category: e.g. "Commercial Video Finishing", "Editorial Portraiture", "Visual Identity & Packaging"
   - description: 2-3 sentence rigorous case study explaining the challenge, execution technique, and final delivery
   - clientImpact: Realistic metrics or performance statement (e.g. "94% average retention rate", "Published in Wallpaper* Magazine", "+45% Brand Recall")
   - detectedTechniques: Array of 4-6 specific technical disciplines demonstrated (e.g., "Color science calibration", "35mm grain emulation", "Kinetic audio design")
2. creatorProfile:
   - headline: Sharp positioning headline (e.g., "Senior Commercial Colorist & Narrative Finisher")
   - bio: 2-paragraph professional narrative describing their aesthetic identity, technical rigor, and client collaborative process
   - detectedSkills: Array of 6 verified skills
   - recommendedHourlyRate: Realistic market rate (integer 75 to 140)
   - recommendedStartingProject: Realistic starting package rate (integer 800 to 2400)
3. ranking:
   - craftScore: Integer from 86 to 98
   - rankTier: e.g. "Master Grade · Top 3%", "Senior Specialist · Top 8%"
   - rankBadge: e.g. "Verified Master", "Elite Specialist"
   - rankingRationale: 2-sentence explanation of why the AI assigned this rank based on the complexity, finish, and technique of the uploaded work.

Respond strictly with JSON adhering to the specified schema.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                portfolioItem: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    category: { type: Type.STRING },
                    description: { type: Type.STRING },
                    clientImpact: { type: Type.STRING },
                    detectedTechniques: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['title', 'category', 'description', 'clientImpact', 'detectedTechniques'],
                },
                creatorProfile: {
                  type: Type.OBJECT,
                  properties: {
                    headline: { type: Type.STRING },
                    bio: { type: Type.STRING },
                    detectedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendedHourlyRate: { type: Type.INTEGER },
                    recommendedStartingProject: { type: Type.INTEGER },
                  },
                  required: ['headline', 'bio', 'detectedSkills', 'recommendedHourlyRate', 'recommendedStartingProject'],
                },
                ranking: {
                  type: Type.OBJECT,
                  properties: {
                    craftScore: { type: Type.INTEGER },
                    rankTier: { type: Type.STRING },
                    rankBadge: { type: Type.STRING },
                    rankingRationale: { type: Type.STRING },
                  },
                  required: ['craftScore', 'rankTier', 'rankBadge', 'rankingRationale'],
                },
              },
              required: ['portfolioItem', 'creatorProfile', 'ranking'],
            },
          },
        });

        const data = JSON.parse(response.text || '{}');
        return res.json({ success: true, data, source: 'gemini' });
      } catch (err) {
        console.warn('Gemini portfolio analyzer fallback:', err);
      }
    }

    // Heuristic Fallback
    return res.json({
      success: true,
      data: {
        portfolioItem: {
          title: workTitle,
          category: discipline.replace('_', ' ').toUpperCase(),
          description: `Analyzed master production asset. Displays exceptional mastery in pacing, composition, and tonal calibration under professional parameters.`,
          clientImpact: 'High audience retention · 92% positive client benchmark',
          detectedTechniques: ['Precision Finishing', 'Color Balance', 'Sound Stems Integration', 'Commercial Framing'],
        },
        creatorProfile: {
          headline: `Lead ${discipline.replace('_', ' ')} Specialist`,
          bio: `Dedicated to cinematic craft and immaculate execution. Each deliverable is sculpted with attention to pacing, emotional rhythm, and technical standards tailored for modern audiences.`,
          detectedSkills: ['Creative Direction', 'Finishing', 'Asset Optimization', 'Format Mastering'],
          recommendedHourlyRate: 95,
          recommendedStartingProject: 1200,
        },
        ranking: {
          craftScore: 92,
          rankTier: 'Senior Specialist · Top 10%',
          rankBadge: 'Verified Master',
          rankingRationale: 'High technical execution detected in uploaded assets with clean delivery formats and professional standards.',
        },
      },
      source: 'heuristic',
    });
  } catch (error: any) {
    console.error('Analyze and build portfolio route error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 5. Conversational Client Service Chat Endpoint
app.post('/api/client-service-chat', async (req, res) => {
  try {
    const { messages = [], creators = [] } = req.body;
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    if (!lastUserMessage) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    if (ai) {
      try {
        const creatorsSummary = creators.map((c: any) => ({
          id: c.id,
          name: c.name,
          discipline: c.discipline,
          title: c.title,
          rate: c.rate,
          startingRate: c.startingProjectRate,
          availability: c.availability,
          ranking: c.ranking?.craftScore || 90,
          rankTier: c.ranking?.rankTier || 'Verified Specialist',
          skills: c.skills,
          portfolioSample: c.portfolioItems?.[0]?.title,
        }));

        const prompt = `You are the lead Executive Talent Agent for SkillBridge AI.
A client is chatting with you to find a content creator for their project.
Conversation History:
${JSON.stringify(messages, null, 2)}

Available creator roster (including recently uploaded creators):
${JSON.stringify(creatorsSummary, null, 2)}

Your task:
1. Write a direct, articulate, consultative response to the client. Acknowledge their creative goals, budget, or timeline if provided, or ask any helpful clarifying questions while maintaining momentum.
2. Identify up to 3 creators from the available roster whose skills, portfolio, and rates best align with the client's request.
3. For each matched creator, explain in 1-2 concise sentences why their specific work matches this client's need.

Respond with JSON adhering to the specified schema.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                replyText: { type: Type.STRING },
                matchedCreatorIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                matchingReasons: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      creatorId: { type: Type.STRING },
                      reason: { type: Type.STRING },
                    },
                    required: ['creatorId', 'reason'],
                  },
                },
              },
              required: ['replyText', 'matchedCreatorIds', 'matchingReasons'],
            },
          },
        });

        const data = JSON.parse(response.text || '{}');
        return res.json({ success: true, data, source: 'gemini' });
      } catch (err) {
        console.warn('Gemini client chat fallback:', err);
      }
    }

    // Heuristic Fallback
    const q = lastUserMessage.toLowerCase();
    const matched = creators.filter((c: any) => {
      const matchSkill = c.skills.some((s: string) => q.includes(s.toLowerCase()));
      const matchDisc = q.includes(c.discipline.toLowerCase().replace('_', ' '));
      return matchSkill || matchDisc;
    }).slice(0, 3);

    const matchedIds = matched.map((c: any) => c.id);

    return res.json({
      success: true,
      data: {
        replyText: `I reviewed your requirements. Based on the scope and aesthetic profile you mentioned, I've filtered our verified creator roster and found creators with directly relevant portfolios ready to assist.`,
        matchedCreatorIds: matchedIds.length > 0 ? matchedIds : creators.slice(0, 2).map((c: any) => c.id),
        matchingReasons: matched.map((c: any) => ({
          creatorId: c.id,
          reason: `Specializes in ${c.skills.slice(0, 2).join(' & ')} with an established commercial portfolio aligned with your brief.`,
        })),
      },
      source: 'heuristic',
    });
  } catch (error: any) {
    console.error('Client service chat route error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillBridge AI Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
