const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const r = await axios.put(
            "https://api.chatengine.io/users/",
            {
                username: username,
                secret: username,
                first_name: username,
            },
            {
                headers: {
                    "Private-Key": "30436015-c7eb-4d56-af56-a8b6f08a6ead",
                },
            }
        );

        console.log("Response from external API:", r.data);

        return res.status(r.status).json(r.data);
    } catch (e) {
        console.error("Error from external API:", e.response.data);

        return res.status(e.response.status).json(e.response.data);
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
