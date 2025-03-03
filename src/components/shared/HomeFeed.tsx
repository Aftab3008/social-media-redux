import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deletePost } from "@/store/postsSlice";
import { RootState } from "@/store/store";
import { format, formatDistanceToNow } from "date-fns";
import { Edit, Edit2, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "./PostForm";

export default function HomeFeed() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const toggleExpand = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="space-y-6 w-full">
      {posts.length === 0 ? (
        <Card className="p-8 text-center max-w-full w-3xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-mute p-6">
              <Edit2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No posts yet</h3>
            <p className="text-sm leading-loose text-muted-foreground">
              Create your first post to get started!
            </p>
          </div>
        </Card>
      ) : (
        posts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-md w-full"
          >
            <CardContent className="pb-4 px-4">
              <p
                className={`mb-4 ${
                  post.content.length > 280 && expandedPost !== post.id
                    ? "line-clamp-4"
                    : ""
                }`}
              >
                {post.content}
              </p>
              {post.content.length > 280 && (
                <Button
                  variant="link"
                  className="px-0 h-auto font-medium text-primary"
                  onClick={() => toggleExpand(post.id)}
                >
                  {expandedPost === post.id ? "Show less" : "Read more"}
                </Button>
              )}
              {post.image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              )}
            </CardContent>
            <Separator />

            <div className="flex justify-between items-center p-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-xs text-muted-foreground">
                      {getTimeAgo(post.createdAt)}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    {format(
                      new Date(post.createdAt),
                      "MMMM d, yyyy 'at' h:mm a"
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <CardFooter className="flex justify-end gap-2 py-4 px-4">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/80 dark:text-muted-foreground hover:text-white/90 bg-primary"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <PostForm post={post} setOpen={setOpen} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive/80"
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
