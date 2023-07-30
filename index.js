document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    item.addEventListener("click", toggleAccordion);
  });
});

async function toggleAccordion(event) {
  const accordionItem = event.currentTarget;
  const accordionContent = accordionItem.querySelector(".accordion-content");
  const factText = accordionItem.querySelector(".factText");
  const plusSymbol = accordionItem.querySelector(".plusSymbol");

  if (accordionContent.style.display === "block") {
    accordionContent.style.display = "none";
    factText.textContent = "Click to open fact";
    plusSymbol.textContent = "+";
    accordionItem.classList.remove("open");
  } else {
    const catInfo = await fetchCatInfo();
    const catImg = await fetchCatImg();

    accordionContent.innerHTML = `
      <p>${catInfo.fact}</p>
      <img src="${catImg.imageUrl}" alt="Random Cat Image" class='img0'>
    `;
    accordionContent.style.display = "block";
    factText.textContent = "Click to close fact";
    plusSymbol.textContent = "-";
    accordionItem.classList.add("open");
  }
}

async function fetchCatInfo() {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    const data = await response.json();
    return {
      fact: data.fact,
    };
  } catch (error) {
    console.error("Error fetching cat information:", error);
    return {
      fact: "Unable to fetch cat information",
    };
  }
}

async function fetchCatImg() {
  try {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=1&api_key=YOUR_CAT_API_KEY"
    );
    const data = await response.json();
    return {
      imageUrl: data[0].url,
    };
  } catch (error) {
    console.error("Error fetching cat img", error);
    return {
      imageUrl: "No Image url",
    };
  }
}
