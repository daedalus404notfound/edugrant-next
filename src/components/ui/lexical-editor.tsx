"use client";

import { useEffect, useState } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getRoot,
  EditorState,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getSelection, $isRangeSelection } from "lexical";

import {
  Bold,
  Italic,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface LexicalEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [alignment, setAlignment] = useState("left");
  const [textStyle, setTextStyle] = useState<"" | "bold" | "italic">("");
  console.log("current Style:", textStyle);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // detect text styles
          if (selection.hasFormat("bold")) {
            setTextStyle("bold");
          } else if (selection.hasFormat("italic")) {
            setTextStyle("italic");
          } else {
            setTextStyle("");
          }

          // detect alignment (paragraph)
          const anchorNode = selection.anchor.getNode();
          const element = anchorNode.getTopLevelElementOrThrow();
          const align = element.getFormatType?.() || "left"; // Lexical stores alignment as a formatType
          setAlignment(align);
        }
      });
    });
  }, [editor]);

  const handleBold = () => {
    if (textStyle === "bold") {
      // turn off bold
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      setTextStyle("");
    } else {
      // turn off italic first (if active)
      if (textStyle === "italic") {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      }
      // turn on bold
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      setTextStyle("bold");
    }
  };

  const handleItalic = () => {
    if (textStyle === "italic") {
      // turn off italic
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      setTextStyle("");
    } else {
      // turn off bold first (if active)
      if (textStyle === "bold") {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
      }
      // turn on italic
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
      setTextStyle("italic");
    }
  };
  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  const handleAlign = (type: "left" | "center" | "right" | "justify") => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
    setAlignment(type);
  };

  return (
    <div className="flex justify-between items-center gap-1 border-b border-border/50 bg-muted/30 rounded-t-lg p-2">
      {/* Text Format */}
      {/* Bold */}
      <div>
        {" "}
        <Button
          type="button"
          variant={textStyle === "bold" ? "secondary" : "ghost"}
          size="sm"
          onClick={handleBold}
          title="Bold"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        {/* Italic */}
        <Button
          type="button"
          variant={textStyle === "italic" ? "secondary" : "ghost"}
          size="sm"
          onClick={handleItalic}
          title="Italic"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
      </div>
      <div>
        <Button
          type="button"
          variant={alignment === "left" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleAlign("left")}
          title="Align Left"
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={alignment === "center" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleAlign("center")}
          title="Align Center"
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={alignment === "right" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleAlign("right")}
          title="Align Right"
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={alignment === "justify" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => handleAlign("justify")}
          title="Justify"
          className="h-8 w-8 p-0"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>{" "}
      </div>
      {/* Undo / Redo */}
      <div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleUndo}
          title="Undo"
          className="h-8 w-8 p-0"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRedo}
          title="Redo"
          className="h-8 w-8 p-0"
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Placeholder({ text }: { text?: string }) {
  return (
    <div className="pointer-events-none absolute top-2 left-2 text-muted-foreground text-sm">
      {text}
    </div>
  );
}

export default function LexicalEditor({
  value,
  onChange,
  placeholder = "Write something...",
}: LexicalEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: "announcer-editor",
    theme: {
      paragraph: "mb-1",
      root: "relative",
    },
    onError: (error) => {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-border/50 rounded-lg bg-background overflow-hidden">
        <Toolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={cn(
                  "min-h-[200px] resize-none bg-input/30 text-sm leading-relaxed transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none p-2"
                )}
              />
            }
            placeholder={<Placeholder text={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          {onChange && (
            <OnChangePlugin
              onChange={(editorState: EditorState) => {
                editorState.read(() => {
                  const text = $getRoot().getTextContent();
                  onChange(text);
                });
              }}
            />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}
