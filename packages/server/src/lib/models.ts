import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import {
  findSupportedChatModel,
  type SupportedChatModel,
  type SupportedChatModelId,
  type SupportedProvider,
} from "@marscode/shared";
import type { LanguageModel } from "ai";

const OPENROUTER_MODEL_IDS = {
  "claude-sonnet-4-6": "anthropic/claude-sonnet-4.6",
  "claude-haiku-4-5": "anthropic/claude-haiku-4.5",
  "claude-opus-4-6": "anthropic/claude-4.6-opus",
  "gpt-5.5": "openai/gpt-5.5",
  "gpt-5.4-mini": "openai/gpt-5.4-mini",
  "gpt-5.4-nano": "openai/gpt-5.4-nano",
} satisfies Record<SupportedChatModelId, string>;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  appName: "MarsCode",
});

export type ResolvedModel = {
  model: LanguageModel;
  provider: SupportedProvider;
  modelId: SupportedChatModelId;
  openRouterModelId: string;
};

function assertOpenRouterApiKey() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }
};

function resolveOpenRouterModel(model: SupportedChatModel): ResolvedModel {
  assertOpenRouterApiKey();

  const openRouterModelId = OPENROUTER_MODEL_IDS[model.id];

  return {
    model: openrouter(openRouterModelId),
    provider: model.provider,
    modelId: model.id,
    openRouterModelId,
  };
};

export function isSupportedChatModel(modelId: string): modelId is SupportedChatModelId {
  return findSupportedChatModel(modelId) != null;
};

export function resolveChatModel(modelId: string): ResolvedModel {
  const model = findSupportedChatModel(modelId);
  if (!model) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  return resolveOpenRouterModel(model);
};
