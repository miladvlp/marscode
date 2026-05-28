import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

const openRouterModelsSchema = z.object({
  data: z.array(
    z
      .object({
        id: z.string(),
        name: z.string().optional(),
        context_length: z.number().optional(),
        pricing: z
          .object({
            prompt: z.string().optional(),
            completion: z.string().optional(),
          })
          .optional(),
      })
      .passthrough(),
  ),
});

const app = new Hono().get("/", async (c) => {
  const res = await fetch("https://openrouter.ai/api/v1/models");

  if (!res.ok) {
    throw new HTTPException(502, {
      message: `Failed to fetch OpenRouter models: ${res.status}`,
    });
  }

  const parsed = openRouterModelsSchema.safeParse(await res.json());

  if (!parsed.success) {
    throw new HTTPException(502, {
      message: "OpenRouter models response was invalid",
    });
  }

  const models = parsed.data.data
    .map((model) => ({
      id: model.id,
      name: model.name ?? model.id,
      contextLength: model.context_length ?? null,
      pricing: {
        prompt: model.pricing?.prompt ?? null,
        completion: model.pricing?.completion ?? null,
      },
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return c.json(models);
});

export default app;
