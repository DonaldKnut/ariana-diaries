"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Bold className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Italic className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Underline className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Strikethrough className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Heading2 className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <List className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <ListOrdered className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Quote className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-[#c59c2a] text-white p-2 rounded-lg"
              : "text-[#6b581e]"
          }
        >
          <Code className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-[#d3a116cc] text-white p-2 rounded-lg"
              : "text-[#cbb224] hover:bg-[#7e6a31cc] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5 text-[#8f751b]" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-[#d3a116cc] text-white p-2 rounded-lg"
              : "text-[#cbb224] hover:bg-[#7e6a31cc] hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5 text-[#8f751b]" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
