// Fetch blog posts from the backend
const response = await fetch('/api/blog');
const posts = await response.json();

// Select the container where blog previews will be rendered
const blogList = document.getElementById('blog-list');

// Clear any existing content
blogList.innerHTML = '';

// Loop through each post and render its preview
posts.forEach(post => {
  // Create a wrapper div for the post preview
  const postDiv = document.createElement('div');
  postDiv.classList.add('blog-post-preview');

  // Create and populate the title element
  const title = document.createElement('h2');
  title.textContent = post.title;

  // Create and populate the author/date element
  const meta = document.createElement('p');
  meta.classList.add('blog-meta');
  meta.textContent = `By ${post.author || 'Unknown'} on ${new Date(post.createdAt).toLocaleDateString()}`;

  // Create the link to the full post
  const link = document.createElement('a');
  link.href = `/blog/${post.slug}`;
  link.textContent = 'Read more';
  link.classList.add('blog-read-more');

  // Append elements to the post preview
  postDiv.appendChild(title);
  postDiv.appendChild(meta);
  postDiv.appendChild(link);

  // Append the post preview to the blog list container
  blogList.appendChild(postDiv);
});
