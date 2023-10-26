import toast from "react-hot-toast";

export const formValidations = (studentForm) => {
    switch (true) {
        case !studentForm.studentName:
        case !studentForm.studentSubject:
        case !studentForm.totalScore:
        case !studentForm.studentScore:
        case !studentForm.studentFeedback:
            toast.error("All the fields are required");
            break;

        case studentForm.totalScore < 1:
        case studentForm.studentScore < 1:
            toast.error("Score must be a non-negative number and not in exponential notation");
            break;

        default:
            toast.success("Student created successfully");
            break;
    }
};
