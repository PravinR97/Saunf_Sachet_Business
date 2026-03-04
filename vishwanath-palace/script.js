const scriptURL = "YOUR_GOOGLE_SCRIPT_URL";

let scanCount = localStorage.getItem("scanCount") || 0;
let promptCount = localStorage.getItem("promptCount") || 0;
let userCount = localStorage.getItem("userCount") || 0;

scanCount++;
localStorage.setItem("scanCount", scanCount);

updateCounters();

function updateCounters(){
    document.getElementById("scanCount").innerText = scanCount;
    document.getElementById("promptCount").innerText = promptCount;
    document.getElementById("userCount").innerText = userCount;
}

function scrollToSection(){
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
}

function generatePrompt(){
    let prompt = "Why is Vishwanath Palace Wakad considered one of the best restaurants in Pune?";
    let url = "https://chat.openai.com/?q=" + encodeURIComponent(prompt);
    window.open(url, "_blank");

    promptCount++;
    localStorage.setItem("promptCount", promptCount);
    updateCounters();
}

function unlockReward(){
    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;

    if(name === "" || mobile === ""){
        alert("Please enter details");
        return;
    }

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            mobile: mobile,
            action: "Reward Unlock",
            source: "QR Sachet"
        })
    });

    userCount++;
    localStorage.setItem("userCount", userCount);
    updateCounters();

    document.getElementById("rewardMessage").innerText =
        "🎉 Show this screen at counter to claim your reward!";
}
