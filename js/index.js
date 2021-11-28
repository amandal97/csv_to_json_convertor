const SUPPORTED_FILE_TYPES = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"];

const input = document.getElementById("file_input");
const browseButton = document.getElementById("browse_button");

browseButton.addEventListener("click", () => {
    input.click();
});

input.addEventListener("change", async () => {
    
    const inputFile = input.files[0];

    if (!inputFile) return;

    if (SUPPORTED_FILE_TYPES.includes(inputFile.type)) {
        const inputText = await inputFile.text();
        const parsedText = Papa.parse(inputText);
        const resultData = parsedText.data;
        const resultColumns = resultData.shift();
        const modelId = inputFile.name.split(".")[0];

        const resultObject = {
            data: resultData,
            columns: resultColumns,
            model_id: modelId
        }

        const json = JSON.stringify(resultObject);

        console.log("result", json);

        const blob = new Blob([json], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${modelId}.json`;
        a.click();
        a.remove();

    } else {
        alert("Incorrect File Type!");
    }
});



