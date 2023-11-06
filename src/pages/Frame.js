import styles from "./Frame.module.css";
import validate from "./FormValidation";
import { useState, useRef } from "react";

const Frame = () => {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
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

  function submit() {
    console.log(errors);
    setShowErrors(true);
    /* if (
      errors !== "Name required" &&
      errors !== "lastName required" &&
      errors !== "email required" &&
      errors !== "message required"
    ) {
      setTimeout(() => {
        setInput({
          name: "",
          lastName: "",
          email: "",
          message: "",
        });
      }, 3000);
    } */
  }

  return (
    <div className={styles.formParent}>
      <form className={styles.form}>
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
              showErrors === true && errors.lastName === "lastName required"
                ? styles.special
                : styles.inputFieldBaseChild
            }
            placeholder="Last Name *"
            type="text"
            value={input.lastName}
            name="lastName"
            onChange={(e) => handleChange(e)}
          />

          {showErrors === true && errors.lastName === "lastName required" ? (
            <div className={styles.alert}>Last Name is required</div>
          ) : errors.lastName === "invalid Last Name format" ? (
            <div className={styles.alert}>Last Name must not contain numbers</div>
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
      </form>

      <button className={styles.button} type="submit">
        <div className={styles.submit} onClick={(e) => submit(e)}>
          Submit
        </div>
      </button>
    </div>
  );
};

export default Frame;
