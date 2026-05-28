import { useCallback, useEffect, useState } from "react";
import { TextAttributes } from "@opentui/core";
import type { InferResponseType } from "hono/client";
import { DialogSearchList } from "../dialog-search-list";
import type { ChatModelId } from "@marscode/shared";
import { useDialog } from "../../provider/dialog";
import { useToast } from "../../provider/toast";
import { apiClient } from "../../lib/api-client";
import { getErrorMessage } from "../../lib/http-errors";

type OpenRouterModel = InferResponseType<(typeof apiClient.models)["$get"], 200>[number];

type ModelsDialogContentProps = {
  currentModel: ChatModelId;
  onSelectModel: (modelId: ChatModelId) => void;
};

export const ModelsDialogContent = ({ 
  currentModel,
  onSelectModel 
}: ModelsDialogContentProps) => {
  const dialog = useDialog();
  const toast = useToast();
  const [models, setModels] = useState<OpenRouterModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchModels = async () => {
      try {
        const res = await apiClient.models.$get();

        if (!res.ok) {
          throw new Error(await getErrorMessage(res));
        }

        const data = await res.json();

        if (!ignore) {
          setModels(data);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          const message = err instanceof Error ? err.message : "Failed to fetch OpenRouter models";
          setError(message);
          setLoading(false);
          toast.show({ variant: "error", message });
        }
      }
    };

    fetchModels();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleSelect = useCallback(
    (model: OpenRouterModel) => {
      onSelectModel(model.id);
      dialog.close();
    },
    [dialog, onSelectModel],
  );

  if (loading) {
    return (
      <box flexDirection="column">
        <text attributes={TextAttributes.DIM}>Loading OpenRouter models...</text>
      </box>
    );
  }

  if (error) {
    return (
      <box flexDirection="column">
        <text attributes={TextAttributes.DIM}>{error}</text>
      </box>
    );
  }

  return (
    <DialogSearchList
      items={models}
      onSelect={handleSelect}
      filterFn={(model, query) => {
        const normalizedQuery = query.toLowerCase();
        return (
          model.id.toLowerCase().includes(normalizedQuery) ||
          model.name.toLowerCase().includes(normalizedQuery)
        );
      }}
      renderItem={(model, isSelected) => (
        <>
          <text selectable={false} fg={isSelected ? "black" : "white"}>
            {model.id === currentModel ? "* " : "  "}
            {model.id}
          </text>
          <box flexGrow={1} />
          <text
            selectable={false}
            fg={isSelected ? "black" : undefined}
            attributes={TextAttributes.DIM}
          >
            {model.contextLength ? `${model.contextLength.toLocaleString()} ctx` : model.name}
          </text>
        </>
      )}
      getKey={(model) => model.id}
      placeholder="Search OpenRouter models"
      emptyText="No matching models"
    />
  );
};
