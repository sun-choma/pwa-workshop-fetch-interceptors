async function handleFetch() {
    const button = document.getElementById("fetch-button")
    const input = document.getElementById("fetch-input")

    try {
        button.innerText = "loading...";
        button.disabled = true;

        const url = input.value;
        const response = await fetch(url);
        const json = await response.json();
        alert(`Success | 成功:\n ${JSON.stringify(json, null, 2)}`);
    } catch (err) {
        alert(`Error | 失敗:\n ${err.message}`);
    } finally {
        document.getElementById("fetch-button").innerText = "fetch";
        button.disabled = false;
    }
}