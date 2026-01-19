import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
// Use process.cwd() assumes running from project root which is standard for npm scripts
const router = jsonServer.router(path.join(process.cwd(), 'mock', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// --- Custom Routes for Altuvya API Mocking ---

// Login Mock
server.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Initialize mock user
    const user = router.db.get('users').find({ username }).value() || router.db.get('users').first().value();

    if (user) { // Always success for demo unless specific fail user
        res.json({
            token: 'mock-jwt-token-12345',
            user: user
        });
    } else {
        res.status(401).json({ message: 'Hatali kullanici adi veya sifre' });
    }
});

// Register Mock
server.post('/auth/register', (req, res) => {
    const { username, email } = req.body;
    const id = Date.now();
    const newUser = { id, username, email, karma: 0, avatar: `https://i.pravatar.cc/150?u=${id}` };

    // Add to DB
    router.db.get('users').push(newUser).write();

    res.json({
        token: 'mock-jwt-token-new-user',
        user: newUser
    });
});

// Join Group Mock
server.post('/groups/:id/join', (req, res) => {
    const groupId = parseInt(req.params.id);
    res.json({ message: 'Joined group', groupId: groupId });
});

// Vote Mock
server.post('/posts/:id/vote', (req, res) => {
    // Just return success
    res.json({ success: true, newScore: 10 });
});

// --- URL Rewrites for GET requests ---
// json-server rewriter helps map complex URLs to json-server standard URLs
// /api prefix handling: Since vite sends /api/foo -> http://localhost:8080/api/foo
// We need to either handle /api here or rewrite it.
server.use(jsonServer.rewriter({
    '/api/*': '/$1', // Strip /api prefix
    '/posts/group/:groupId': '/posts?groupId=:groupId',
    '/posts/spotlight': '/posts?isSpotlight=true',
    '/users/username/:username': '/users?username=:username'
}));

server.use(router);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
    console.log(`Mocking API for Altuvya Frontend`);
});
