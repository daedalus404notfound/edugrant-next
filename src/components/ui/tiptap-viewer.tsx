import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
interface TipTapViewerProps {
  content: string;
  className?: string;
}

export function TipTapViewer({ content, className = "" }: TipTapViewerProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      TextStyle, // required for Color
      Color.configure({ types: ["textStyle"] }), // enables color for text
      Heading.configure({
        levels: [1, 2, 3, 4], // ✅ explicitly define levels
      }),
    ],
    content: content,
    editable: false,
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none ${className}`,
      },
    },
  });

  // Update content when it changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-viewer">
      <EditorContent editor={editor} />
    </div>
  );
}
