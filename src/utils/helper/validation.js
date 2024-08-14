export function isValidUUID(uuid) {
    const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
}
export function validateField(fieldName, value, setErrors) {
    let error = "";
    switch (fieldName) {
        case "title":
            if (value.trim() === "") {
                error = "Title is required";
            } else if (value.length < 3) {
                error = "Title must be at least 3 characters long";
            }
            break;
        case "desc":
            if (value.trim() === "") {
                error = "Description is required";
            } else if (value.length < 4) {
                error = "Description must be at least 3 characters long";
            }
            break;
        case "language":
            if (value.trim() === "") {
                error = "Language is required";
            }
            break;
        case "price":
            if (isNaN(value) || Number(value) <= 0) {
                error = "Price must be a positive number";
            }
            break;
        case "video":
            if (value === null) {
                error = "Video must be uploaded";
            }
            break;
        case "image":
            if (value === null) {
                error = "Image must be uploaded";
            }
            break;
        case "tags":
            if (
                !Array.isArray(value) ||
                value.some((tag) => tag.trim() === "")
            ) {
                error = "Tags must be non-empty";
            }
            if (new Set(value).size !== value.length) {
                error = "Tags must be unique";
            }
            break;
        default:
            break;
    }
    setErrors((prevErrors) => {
        const updatedErrors = {
            ...prevErrors,
            [fieldName]: error,
        };
        console.log("Updated Errors State:", updatedErrors);
        return updatedErrors;
    });

    return error === "";
}
