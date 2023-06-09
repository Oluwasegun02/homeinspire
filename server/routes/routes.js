import express from "express";
import auth from "../middleware/auth.js";
import { getPost, getPostsBySearch, createPost, updatePost, commentPost, deletePost, getPosts, likePost, upload } from "../controllers/posts.js";
import { logout, signin, signup } from "../controllers/user.js";
import { authPage, detailsPage, errorPage } from "../controllers/pages.js";

const router = express.Router();

// webpages routes
router.get("/error", errorPage);
router.get("/auth", authPage);
router.get("/details", detailsPage);

// Auth. routes
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/logout", logout);


// posts routes
router.get('/', getPosts)
router.get('/:id/post', getPost);
router.post("/create", upload, createPost);



// router.get('/search', getPostsBySearch)
// router.post('/', auth, createPost)
// router.patch('/:id', auth, updatePost)
// router.delete("/:id", auth, deletePost);
// router.patch("/:id/likePost", auth, likePost);
// router.post("/:id/commentPost", auth, commentPost);




export default router