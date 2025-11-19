// Load blogs on page load
document.addEventListener("DOMContentLoaded", loadBlogs);

document.getElementById("createBtn").addEventListener("click", () => {
    const title = document.getElementById("titleInput").value.trim();
    const content = document.getElementById("contentInput").value.trim();
    const mediaFile = document.getElementById("mediaInput").files[0];

    if (!title || !content) {
        alert("Please fill all fields.");
        return;
    }

    let mediaURL = "";

    if (mediaFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            mediaURL = e.target.result;
            saveBlog(title, content, mediaURL);
        };
        reader.readAsDataURL(mediaFile);
    } else {
        saveBlog(title, content, "");
    }
});

function saveBlog(title, content, mediaURL) {
    const blog = {
        id: Date.now(),
        title,
        content,
        mediaURL
    };

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));

    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";
    document.getElementById("mediaInput").value = "";

    loadBlogs();
}

// Display blogs
function loadBlogs() {
    const blogContainer = document.getElementById("blogContainer");
    blogContainer.innerHTML = "";

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.forEach(blog => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        let mediaElement = "";
        if (blog.mediaURL) {
            if (blog.mediaURL.includes("video")) {
                mediaElement = `<video controls><source src="${blog.mediaURL}"></video>`;
            } else {
                mediaElement = `<img src="${blog.mediaURL}" alt="Blog Media">`;
            }
        }

        blogCard.innerHTML = `
            <div class="blog-title">${blog.title}</div>
            <div class="blog-content">${blog.content}</div>
            ${mediaElement}
            <button class="btn delete" onclick="deleteBlog(${blog.id})">Delete</button>
        `;

        blogContainer.appendChild(blogCard);
    });
}

// Delete blog
function deleteBlog(id) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    loadBlogs();
}
