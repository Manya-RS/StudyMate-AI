const subjectInput = document.getElementById("subject");
const questionInput = document.getElementById("question");
const explainBtn = document.getElementById("explainBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const result = document.getElementById("result");
const answer = document.getElementById("answer");

explainBtn.addEventListener("click", async () => {

    const subject = subjectInput.value.trim();
const question = questionInput.value.trim();
    // Clear previous messages
    error.classList.add("hidden");
    result.classList.add("hidden");

    // Check for empty input
    if (!question) {
        error.textContent = "Please enter a topic or question.";
        error.classList.remove("hidden");
        return;
    }

    // Show loading state
    loading.classList.remove("hidden");
    explainBtn.disabled = true;

    try {

        const response = await fetch("/api/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
    subject: subject,
    question: question
})
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        // Clear previous answer
        answer.innerHTML = "";

        // Title
        const title = document.createElement("h2");
        title.textContent = data.title;
        answer.appendChild(title);

        // Direct answer
        if (data.directAnswer) {
            const directAnswer = document.createElement("p");
            directAnswer.textContent = data.directAnswer;
            answer.appendChild(directAnswer);
        }

        // Sections
        if (data.sections && data.sections.length > 0) {

            data.sections.forEach(section => {

                const sectionDiv = document.createElement("div");
                sectionDiv.className = "answer-section";

                const heading = document.createElement("h3");
                heading.textContent = section.heading;
                sectionDiv.appendChild(heading);

                if (section.content) {
                    const content = document.createElement("p");
                    content.textContent = section.content;
                    sectionDiv.appendChild(content);
                }

                if (section.points && section.points.length > 0) {

                    const list = document.createElement("ul");

                    section.points.forEach(point => {
                        const listItem = document.createElement("li");
                        listItem.textContent = point;
                        list.appendChild(listItem);
                    });

                    sectionDiv.appendChild(list);
                }

                answer.appendChild(sectionDiv);
            });
        }

        // Example
        if (data.example) {

            const exampleDiv = document.createElement("div");
            exampleDiv.className = "answer-section";

            const exampleHeading = document.createElement("h3");
            exampleHeading.textContent = "Example";
            exampleDiv.appendChild(exampleHeading);

            const exampleText = document.createElement("p");
            exampleText.textContent = data.example;
            exampleDiv.appendChild(exampleText);

            answer.appendChild(exampleDiv);
        }

        // Quick revision
        if (data.quickRevision && data.quickRevision.length > 0) {

            const revisionDiv = document.createElement("div");
            revisionDiv.className = "answer-section";

            const revisionHeading = document.createElement("h3");
            revisionHeading.textContent = "Quick Revision";
            revisionDiv.appendChild(revisionHeading);

            const revisionList = document.createElement("ul");

            data.quickRevision.forEach(point => {
                const listItem = document.createElement("li");
                listItem.textContent = point;
                revisionList.appendChild(listItem);
            });

            revisionDiv.appendChild(revisionList);

            answer.appendChild(revisionDiv);
        }
        // Visual Help
        if (
            data.visualHelp &&
            data.visualHelp.needed &&
            data.visualHelp.searchQuery
        ) {
            const visualDiv = document.createElement("div");
            visualDiv.className = "answer-section visual-help";

            const visualHeading = document.createElement("h3");
            visualHeading.textContent = "🖼️ Visual Help";
            visualDiv.appendChild(visualHeading);

            const visualText = document.createElement("p");
            visualText.textContent =
                data.visualHelp.description ||
                "A visual reference may help you understand this topic.";
            visualDiv.appendChild(visualText);

            const visualLink = document.createElement("a");
            visualLink.href =
                "https://www.google.com/search?tbm=isch&q=" +
                encodeURIComponent(data.visualHelp.searchQuery);
            visualLink.target = "_blank";
            visualLink.rel = "noopener noreferrer";
            visualLink.textContent = "View diagram references →";

            visualDiv.appendChild(visualLink);
            answer.appendChild(visualDiv);
        }

        // Learn More
        if (data.learnMore) {
            const learnDiv = document.createElement("div");
            learnDiv.className = "answer-section learn-more";

            const learnHeading = document.createElement("h3");
            learnHeading.textContent = "🔗 Learn More";
            learnDiv.appendChild(learnHeading);

            if (data.learnMore.youtubeQuery) {
                const youtubeLink = document.createElement("a");
                youtubeLink.href =
                    "https://www.youtube.com/results?search_query=" +
                    encodeURIComponent(data.learnMore.youtubeQuery);
                youtubeLink.target = "_blank";
                youtubeLink.rel = "noopener noreferrer";
                youtubeLink.textContent = "▶️ Watch YouTube explanations";

                learnDiv.appendChild(youtubeLink);
            }

            if (data.learnMore.webQuery) {
                const webLink = document.createElement("a");
                webLink.href =
                    "https://www.google.com/search?q=" +
                    encodeURIComponent(data.learnMore.webQuery);
                webLink.target = "_blank";
                webLink.rel = "noopener noreferrer";
                webLink.textContent = "🌐 Explore web resources";

                learnDiv.appendChild(webLink);
            }

            answer.appendChild(learnDiv);
        }
        // Show result
        result.classList.remove("hidden");

} catch (err) {

    if (err.message.includes("429")) {
        error.textContent =
            "The free AI request limit has been reached. Please try again after the quota resets.";
    } else if (err.message.includes("503")) {
        error.textContent =
            "The AI service is temporarily busy. Please try again in a little while.";
    } else {
        error.textContent = err.message;
    }

    error.classList.remove("hidden");

}    finally {

        loading.classList.add("hidden");
        explainBtn.disabled = false;

    }
});