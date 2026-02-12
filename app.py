import streamlit as st
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

st.title("AI Visibility Scanner for Restaurants")

website = st.text_input("Enter Restaurant Website URL")

if st.button("Scan Website"):
    try:
        response = requests.get(website)
        soup = BeautifulSoup(response.text, "html.parser")

        score = 0
        issues = []

        # Check Title
        if soup.title:
            score += 20
        else:
            issues.append("Missing title tag")

        # Check Meta Description
        if soup.find("meta", attrs={"name": "description"}):
            score += 20
        else:
            issues.append("Missing meta description")

        # Check Schema
        if soup.find("script", type="application/ld+json"):
            score += 30
        else:
            issues.append("Missing schema markup")

        # Basic HTTPS check
        if website.startswith("https"):
            score += 20
        else:
            issues.append("Website not secure (HTTPS missing)")

        # Basic content length
        if len(response.text) > 2000:
            score += 10
        else:
            issues.append("Low content size")

        st.success(f"AI Visibility Score: {score}/100")

        if issues:
            st.write("### Issues Found:")
            for issue in issues:
                st.write("- ", issue)

        # Save Data
        data = {
            "Website": website,
            "Score": score,
            "Date": datetime.now()
        }

        df = pd.DataFrame([data])
        df.to_csv("scan_data.csv", mode="a", header=False, index=False)

    except:
        st.error("Error scanning website. Check URL.")
