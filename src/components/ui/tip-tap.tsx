import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Undo,
  Redo,
  Redo2,
  Undo2,
  Heading1Icon,
  Heading1,
  Heading3,
  Heading4,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { useEffect } from "react";

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TipTapEditor({
  value,
  onChange,
  placeholder = "Start typing...",
}: TipTapEditorProps) {
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
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-3 text-sm",
      },
    },
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);
  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-md">
      {/* Toolbar */}
      <div className=" bg-muted/30 p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <Heading1Icon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Button
                type="button"
                variant={
                  editor.isActive("heading", { level: 1 })
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
              >
                <Heading1 /> Heading 1
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Button
                type="button"
                variant={
                  editor.isActive("heading", { level: 2 })
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
              >
                <Heading2 /> Heading 2
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Button
                type="button"
                variant={
                  editor.isActive("heading", { level: 3 })
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
              >
                <Heading3 /> Heading 3
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
            >
              <Button
                type="button"
                variant={
                  editor.isActive("heading", { level: 4 })
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
              >
                <Heading4 /> Heading 4
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        {/* <div className="w-px bg-border mx-1" />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setColor("#e11d48").run()}
          className="rounded-full bg-red-800 size-6 mt-1"
        ></Button>

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().setColor("#3b82f6").run()}
          className="rounded-full bg-blue-800 size-6 mt-1"
        ></Button>

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => editor.chain().focus().unsetColor().run()}
        >
          <RefreshCcw />
        </Button> */}

        <div className="w-px bg-border mx-1" />

        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent
        className="dark:bg-input/30 bg-transparent shadow-xs border overflow-hidden rounded-md"
        editor={editor}
      />
    </div>
  );
}
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Image from "@tiptap/extension-image";
// import {
//   Bold,
//   Italic,
//   List,
//   ListOrdered,
//   Heading2,
//   Undo,
//   Redo,
//   ImageIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useCallback, useRef } from "react";

// interface TipTapEditorProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// export function TipTapEditor({
//   value,
//   onChange,
//   placeholder = "Start typing...",
// }: TipTapEditorProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit.configure({
//         heading: {
//           levels: [2, 3],
//         },
//       }),
//       Placeholder.configure({
//         placeholder,
//       }),
//       Image.configure({
//         inline: true,
//         allowBase64: true,
//         HTMLAttributes: {
//           class: "rounded-lg max-w-full h-auto",
//         },
//       }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-3 py-2",
//       },
//     },
//   });

//   const addImage = useCallback(() => {
//     const url = window.prompt("Enter image URL:");

//     if (url && editor) {
//       editor.chain().focus().setImage({ src: url }).run();
//     }
//   }, [editor]);

//   const handleImageUpload = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       if (!file || !editor) return;

//       // Check if file is an image
//       if (!file.type.startsWith("image/")) {
//         alert("Please select an image file");
//         return;
//       }

//       // Convert to base64
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const base64 = e.target?.result as string;
//         editor.chain().focus().setImage({ src: base64 }).run();
//       };
//       reader.readAsDataURL(file);

//       // Reset input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     },
//     [editor]
//   );

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="border rounded-md">
//       {/* Hidden file input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="hidden"
//       />

//       {/* Toolbar */}
//       <div className="border-b bg-muted/30 p-2 flex flex-wrap gap-1">
//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           disabled={!editor.can().chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "bg-muted" : ""}
//         >
//           <Bold className="h-4 w-4" />
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           disabled={!editor.can().chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? "bg-muted" : ""}
//         >
//           <Italic className="h-4 w-4" />
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
//         >
//           <Heading2 className="h-4 w-4" />
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={editor.isActive("bulletList") ? "bg-muted" : ""}
//         >
//           <List className="h-4 w-4" />
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={editor.isActive("orderedList") ? "bg-muted" : ""}
//         >
//           <ListOrdered className="h-4 w-4" />
//         </Button>

//         <div className="w-px bg-border mx-1" />

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => fileInputRef.current?.click()}
//           title="Upload image"
//         >
//           <ImageIcon className="h-4 w-4" />
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={addImage}
//           title="Insert image from URL"
//         >
//           <ImageIcon className="h-4 w-4 opacity-60" />
//         </Button>

//         <div className="w-px bg-border mx-1" />

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().undo().run()}
//           disabled={!editor.can().chain().focus().undo().run()}
//         >
//           <Undo className="h-4 w-4" />
//         </Button>

//         <Button
//           type="button"
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().redo().run()}
//           disabled={!editor.can().chain().focus().redo().run()}
//         >
//           <Redo className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Editor Content */}
//       <EditorContent editor={editor} />
//     </div>
//   );
// }
