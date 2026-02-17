import streamlit as st
import pandas as pd
import numpy as np

st.title("my Streamlit app")
st.write(":streamlit: hello atharva")
st.text("lets start")

name=st.text_input("Enter name ", key="name_input")

if st.button("greet", key="greet_button"):
    st.success(f"hello, {name} !")
    
df=pd.DataFrame(np.random.randn(20,2),columns=['A','B'])
st.line_chart(df)
st.bar_chart(df)

st.sidebar.title("Navigation")
st.image("https://i.ytimg.com/vi/f7t7KUCSQ_A/maxresdefault.jpg")

st.title("abc Text and Markdown Demo")
st.header("This is a header")
st.subheader("This is a subheader")
st.markdown("**Bold**, *Italic*, `Code`, [Link](https://streamlit.io)")
st.code("for i in range(5): print(i)", language="python")

st.text_input("What's your name?", key="name_input2")
st.text_area("Write something...", key="text_area1")
st.number_input("Pick a number", min_value=0, max_value=100, key="number_input1")
st.slider("Choose a range", 0, 100, key="slider1")
st.selectbox("Select a fruit", ["Apple", "Banana", "Mango"], key="selectbox1")
st.multiselect("Choose toppings", ["Cheese", "Tomato", "Olives"], key="multiselect1")
st.radio("Pick one", ["Option A", "Option B"], key="radio1")
st.checkbox("I agree to the terms", key="checkbox1")

if st.checkbox("Show Details", key="checkbox2"):
    st.info("Here are more details...")