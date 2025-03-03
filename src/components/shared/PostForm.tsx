import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "@/store/postsSlice";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@/types";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImagePlus, X } from "lucide-react";
import { compressImage } from "@/lib/utils";

interface PostFormProps {
  post?: Post;
  onSuccess?: () => void;
  setOpen: (open: boolean) => void;
}

export default function PostForm({ post, onSuccess, setOpen }: PostFormProps) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(post?.content || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressedImage = await compressImage(file);
        setImagePreview(compressedImage);
      } catch (error) {
        console.error("Error compressing image:", error);
        setImagePreview("");
      }
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: Post = {
      id: post?.id || Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
    };

    if (imagePreview) {
      newPost.image = imagePreview;
    }

    if (post) {
      dispatch(updatePost(newPost));
    } else {
      dispatch(addPost(newPost));
    }
    onSuccess?.();
    setContent("");
    clearImage();
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{post ? "Edit Post" : "Create New Post"}</DialogTitle>
        <DialogDescription>
          {post
            ? "Update your post content and image"
            : "Share your thoughts with the community"}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none"
          required
        />

        <div className="space-y-2">
          <Label htmlFor="image-file" className="flex items-center gap-2">
            <ImagePlus className="w-4 h-4" />
            Add Image (optional)
          </Label>
          <div className="flex gap-2">
            <Input
              id="image-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1"
            />
            {imagePreview && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={clearImage}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {imagePreview && (
            <div className="relative mt-2 rounded-md overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto max-h-[200px] object-cover rounded-md"
                onError={() => setImagePreview("")}
              />
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {post ? "Update Post" : "Post"}
        </Button>
      </DialogFooter>
    </form>
  );
}
