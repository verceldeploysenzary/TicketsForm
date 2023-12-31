import styles from "./Frame.module.css";
import validate from "./FormValidation";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Frame = () => {
  const [input, setInput] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [showErrors, setShowErrors] = useState(false);



  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };





  function submit() {
    console.log(errors);
    setShowErrors(true);

    e.preventDefault();
    emailjs
      .sendForm(
        "service_hx714vi",
        "template_r9kf53t",
        form.current,
        "ytL8b4o8pWUk16U5K"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message send");

          setInput({
            name: "",
            company: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
    
  }




/*   images  */  
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFilesSelected(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }
  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }
/*   images  */  

  return (
    <div className={styles.formParent}>
      <form ref={form} className={styles.form} onSubmit={submit}>
        <div className={styles.formText}>
          <div className={styles.ticketForm}>Ticket Form</div>
          <div className={styles.fillInYour}>
            Fill in to create your ticket.
          </div>
          <p className={styles.areRequired}>Required Fields are Marked with *</p>

        </div>
        <div className={styles.formFields}>
          <div className={styles.formText}>
            <div className={styles.inputFieldBase}>
              <div className={styles.email}>Email</div>
              <input
                className={
                  showErrors === true && errors.name === "Name required"
                    ? styles.special
                    : styles.inputFieldBaseChild
                }
                /* className={styles.inputFieldBaseChild} */
                placeholder="Name *"
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {showErrors === true && errors.name === "Name required" ? (
                <div className={styles.alert}>Name is required</div>
              ) :
                errors.name === "invalid Name format" ? (
                <div className={styles.alert}>Name must not contain numbers</div>
              ) : null}
              <div className={styles.thisIsA}>
                This is a hint text for the user
              </div>
            </div>
          </div>
          <input
            className={
              showErrors === true && errors.company === "company required"
                ? styles.special
                : styles.inputFieldBaseChild
            }
            placeholder="Company *"
            type="text"
            value={input.company}
            name="company"
            onChange={(e) => handleChange(e)}
          />

          {showErrors === true && errors.company === "company required" ? (
            <div className={styles.alert}>Last Name is required</div>
          ) : errors.company === "invalid Company format" ? (
            <div className={styles.alert}>Company must not contain numbers</div>
          ) : null}
          <div className={styles.formText}>
            <div className={styles.inputFieldBase}>
              <div className={styles.email}>Email</div>
              <input
                className={
                  showErrors === true && errors.email === "email required"
                    ? styles.special
                    : styles.inputFieldBaseChild
                }
                /* className={styles.inputFieldBaseChild} */
                placeholder="Email address *"
                type="text"
                value={input.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
              {showErrors === true && errors.email === "email required" ? (
                <div className={styles.alert}>Message is required</div>
              ) : errors.email === "invalid email format" ? (
                <div className={styles.alert}>invalid email format</div>
              ) : null}

              <div className={styles.thisIsA}>
                This is a hint text for the user
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            showErrors === true && errors.message === "message required"
              ? styles.emailWrapperSpecial
              : styles.emailWrapper
          }
        >
          <textarea
            className={styles.email2}
            placeholder="Description *"
            value={input.message}
            name="message"
            onChange={(e) => handleChange(e)}
          />
          {showErrors === true && errors.message === "message required" ? (
            <div className={styles.alert}>Message is required</div>
          ) : errors.message === "message must be longer than 10 characters" ? (
            <div className={styles.alert}>
              Message must be longer than 10 characters
            </div>
          ) : null}
        </div>


        <div className={styles.top}>
          <div className={styles.card}>
            <p>Upload image</p>
            <p className={styles.dragandrop}>Drag and drop</p>

            <div
              className={styles.dragarea}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              {isDragging ? (
                <span className={styles.select}>attache images </span>
              ) : (
                <>
                  Attache images here or{" "}
                  <span
                    className={styles.select}
                    role="button"
                    onClick={selectFiles}
                  >
                    browse
                  </span>
                </>
              )}

              <input
                name="file"
                type="file"
                className={styles.file}
                multiple
                ref={fileInputRef}
                onChange={onFilesSelected}
              ></input>
            </div>

            <div className={styles.container}>
              {images.map((images, index) => (
                <div className={styles.image} key={index}>
                  <span
                    className={styles.delete}
                    onClick={() => deleteImage(index)}
                  >
                    &times;
                  </span>
                  <img src={images.url} alt={images.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      <button className={styles.button} type="submit">
        <div className={styles.submit}>
          Submit
        </div>
      </button>
      </form>

    </div>
  );
};

export default Frame;
