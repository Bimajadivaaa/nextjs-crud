export default function PostList({ params }: { params: { postId: string } }) {
  return <div>Post {params.postId}</div>;
}
