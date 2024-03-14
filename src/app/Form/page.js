"use client";
import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

const page = () => {
  const [formData, setFormData] = useState({
    projectTitle: "", // Added for project's title
    subtitle: "",
    liveProjectLink: "", // Added for live project link
    projectDescription: "", // Added for project description
    tableOfContents: "", // Added for table of contents
    frameworks: [],
    installInstructions: "", // Added for installation instructions
    howToUse: "", // Added for how to use the project
    contributors: [],
    imageUploads: [], // Added for image upload (initialize as null)
    runInstructions: "",
    credits: [], // Added for credits
  });
  const [showMarkdownEditor, setShowMarkdownEditor] = useState(false);

  const [markdownContent, setMarkdownContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("contributor")) {
      const [field, index, property] = name.split("-");
      const updatedContributors = [...formData.contributors];
      if (!updatedContributors[index]) {
        updatedContributors[index] = {}; // Initialize if not present
      }
      updatedContributors[index][property] = value;
      setFormData({
        ...formData,
        contributors: updatedContributors,
      });
    } else if (name.startsWith("credits")) {
      const [field, index, property] = name.split("-");
      const updatedCredits = [...formData.credits];
      if (!updatedCredits[index]) {
        updatedCredits[index] = {}; // Initialize if not present
      }
      updatedCredits[index][property] = value;
      setFormData({
        ...formData,
        credits: updatedCredits,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;

    // Convert the FileList to an array
    const imageArray = Array.from(files);

    // Update the state with the new array of images
    setFormData({
      ...formData,
      imageUploads: imageArray,
    });
  };

  const generateMarkdown = () => {
    let markdown = `# ${formData.projectTitle}\n\n`;
    let sectionCounter = 1; // Initialize section counter

    // Initialize the table of contents
    let tableOfContents = "";

    // Add section headers and content

    if (formData.subtitle) {
      tableOfContents += `${sectionCounter}. [Subtitle](#subtitle)\n`;
      markdown += `## ${sectionCounter}. Subtitle\n${formData.subtitle}\n\n`;
      sectionCounter++;
    }

    if (formData.projectDescription) {
      tableOfContents += `${sectionCounter}. [Project Description](#project-description)\n`;
      markdown += `## ${sectionCounter}. Project Description\n${formData.projectDescription}\n\n`;
      sectionCounter++;
    }
    if (formData.frameworks) {
      tableOfContents += `${sectionCounter}. [Frameworks, Courses, etc.](#frameworks-courses-etc)\n`;
      markdown += `## ${sectionCounter}. Frameworks, Courses, etc.\n${formData.frameworks}\n\n`;
      sectionCounter++;
    }
    if (formData.liveProjectLink) {
      tableOfContents += `${sectionCounter}. [Live Project Link](#live-project-link)\n`;
      markdown += `## ${sectionCounter}. Live Project Link\n[${formData.liveProjectLink}](${formData.liveProjectLink})\n\n`;
      sectionCounter++;
    }
    if (formData.tableOfContents) {
      tableOfContents += `${sectionCounter}. [Table of Contents](#table-of-contents)\n`;
      markdown += `## ${sectionCounter}. Table of Contents\n${formData.tableOfContents}\n\n`;
      sectionCounter++;
    }
    if (formData.installInstructions) {
      tableOfContents += `${sectionCounter}. [How to Install](#how-to-install-the-project)\n`;
      markdown += `## ${sectionCounter}. How to Install the Project\n\n`;
      markdown += "```shell\n"; // Opening code block for shell/command-line
      markdown += formData.installInstructions + "\n";
      markdown += "```\n\n"; // Closing code block
      sectionCounter++;
    }
    if (formData.runInstructions) {
      tableOfContents += `${sectionCounter}. [How to Run the Project](#how-to-run-the-project)\n`;
      markdown += `## ${sectionCounter}. How to Run the Project\n\n`;
      markdown += "```shell\n"; // Opening code block for shell/command-line
      markdown += formData.runInstructions + "\n";
      markdown += "```\n\n"; // Closing code block
      sectionCounter++;
    }
    if (formData.howToUse) {
      tableOfContents += `${sectionCounter}. [How to Use the Project](#how-to-use-the-project)\n`;
      markdown += `## ${sectionCounter}. How to Use the Project\n${formData.howToUse}\n\n`;
      sectionCounter++;
    }
    if (formData.credits && formData.credits.length > 0) {
      tableOfContents += `${sectionCounter}. [Include Credits](#include-credits)\n`;
      markdown += `## ${sectionCounter}. Include Credits\n`;

      // Loop through credits and add their names and links in the desired format
      formData.credits.forEach((credit, index) => {
        markdown += `- [${credit.name}](${credit.link})\n`;
      });

      if (formData.imageUploads.length > 0) {
        tableOfContents += `${sectionCounter}. [Images](#images)\n`;
        markdown += `## ${sectionCounter}. Images\n`;
      
        // Loop through the uploaded images and create markdown for each
        formData.imageUploads.forEach((image, index) => {
          markdown += `![Image ${index + 1}](URL_TO_IMAGE)\n`;
          // You should replace 'URL_TO_IMAGE' with the actual URL or path to each image.
        });
      
        markdown += '\n'; // Add a line break after images
        sectionCounter++;
      }
      

      markdown += "\n"; // Add a line break between credits and the next section
      sectionCounter++;
    }

    if (formData.contributors && formData.contributors.length > 0) {
      tableOfContents += `${sectionCounter}. [Include Contributors](#include-contributors)\n`;
      markdown += `## ${sectionCounter}. Include Contributors\n`;

      // Loop through contributors and add their names and GitHub profiles in the desired format
      formData.contributors.forEach((contributor, index) => {
        markdown += `- [${contributor.name}](${contributor.github})\n`;
      });

      markdown += "\n"; // Add a line break between contributors and the next section
      sectionCounter++;
    }

    // Insert the table of contents at the beginning of the document
    markdown = `# Table of Contents\n${tableOfContents}\n` + markdown;

    return markdown;
  };

  const addCredit = () => {
    // Add a new credit object to the credits array
    setFormData((prevData) => ({
      ...prevData,
      credits: [...prevData.credits, {}],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedMarkdown = generateMarkdown();
    setMarkdownContent(generatedMarkdown);
    console.log(generatedMarkdown);
  };

  const [formFields, setFormFields] = useState([
    { id: "projectTitle", label: "Project Title", isMultiLine: false },
    { id: "subtitle", label: "Subtitle", isMultiLine: false },
    {
      id: "projectDescription",
      label: "Project Description",
      isMultiLine: true,
    },
    { id: "installInstructions", label: "How to Install", isMultiLine: true },
    { id: "runInstructions", label: "How to Run", isMultiLine: true },
    { id: "howToUse", label: "How to Use the Project", isMultiLine: true },
    { id: "credits", label: "Include Credits", isMultiLine: true },
    { id: "liveProjectLink", label: "Live Project Link", isMultiLine: false },
    { id: "imageUpload", label: "Upload Image", isMultiLine: false },
    { id: "contributors", label: "Contributor", isMultiLine: false },
    // { id: 'contributorGitHub', label: 'Contributor GitHub Profile', isMultiLine: false },
  ]);

  const toggleField = (fieldId) => {
    const updatedFields = formFields.map((field) => {
      if (field.id === fieldId) {
        return {
          ...field,
          isOpen: !field.isOpen,
        };
      }
      return field;
    });
    setFormFields(updatedFields);
  };

  const toggleMarkdownEditor = () => {
    setShowMarkdownEditor(!showMarkdownEditor);
  };

  const removeContributor = (indexToRemove) => {
    const updatedContributors = formData.contributors.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      contributors: updatedContributors,
    });
  };

  const removeCredit = (indexToRemove) => {
    const updatedCredits = formData.credits.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      credits: updatedCredits,
    });
  };

  const renderFormFields = () => {
    return formFields.map((field) => (
      <div key={field.id} className="mb-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor={field.id}
            className="text-xl font-medium text-gray-700 cursor-pointer"
            onClick={() => toggleField(field.id)}
          >
            {field.label}
            {field.isOpen ? (
              <span className="ml-2 text-green-500">-</span>
            ) : (
              <span className="ml-2 text-blue-500">+</span>
            )}
          </label>
        </div>
        {field.isOpen && (
          <div>
            {field.id === "contributors" ? (
              <div>
                {formData.contributors.map((contributor, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`contributor-${index}-name`}
                      value={contributor.name || ""}
                      placeholder="Contributor Name"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={`contributor-${index}-github`}
                      value={contributor.github || ""}
                      placeholder="GitHub Profile"
                      onChange={handleChange}
                    />
                    <button
                      onClick={() => removeContributor(index)}
                      className="mt-2 text-red-500"
                    >
                      Remove Contributor
                    </button>
                  </div>
                ))}
                <button onClick={addContributor} className="mt-2 text-blue-500">
                  Add Contributor
                </button>
              </div>
            ) : field.id === "credits" ? (
              <div>
                {formData.credits.map((credit, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name={`credits-${index}-name`}
                      value={credit.name || ""}
                      placeholder="Credit"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={`credits-${index}-link`}
                      value={credit.link || ""}
                      placeholder="Credit Link"
                      onChange={handleChange}
                    />
                    <button
                      onClick={() => removeCredit(index)}
                      className="mt-2 text-red-500"
                    >
                      Remove Credit
                    </button>
                  </div>
                ))}
                <button onClick={addCredit} className="mt-2 text-blue-500">
                  Add Credit
                </button>
              </div>
            ) : field.isMultiLine ? (
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40 focus:outline-none focus:border-blue-500"
                rows="6"
              />
            ) : field.id === "imageUpload" ? (
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                multiple // Add the 'multiple' attribute to allow multiple file selection
                onChange={handleImageUpload}
                className="mt-1"
              />
            ) : (
              <input
                type="text"
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        )}
      </div>
    ));
  };

  const addContributor = () => {
    // Add a new contributor object to the contributors array
    setFormData((prevData) => ({
      ...prevData,
      contributors: [...prevData.contributors, {}],
    }));
  };

  const renderMarkdownEditor = () => {
    if (showMarkdownEditor) {
      return (
        <div>
          <MDEditor value={markdownContent} onChange={setMarkdownContent} />
        </div>
      );
    }
    return null;
  };

  const renderMarkdownPreview = () => {
    if (showMarkdownEditor) {
      return (
        <div>
          <MDEditor.Markdown
            source={generateMarkdown}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      );
    }
    return null;
  };
  const downloadMarkdownFile = () => {
    // Generate the Markdown content
    const generatedMarkdown = generateMarkdown();

    // Create a Blob object with the Markdown content
    const blob = new Blob([generatedMarkdown], { type: "text/plain" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();

    // Release the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 flex">
      <div className="text-center mx-12">
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={downloadMarkdownFile} // Add the download function here
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Download README.md
          </button>
          <button
            onClick={toggleMarkdownEditor}
            className="py-2 px-4 rounded-md"
          >
            {showMarkdownEditor
              ? "Hide Markdown and Preview"
              : "Show Markdown and Preview"}
          </button>
        </form>
      </div>

      {renderMarkdownEditor()}
      {renderMarkdownPreview()}
    </div>
  );
};

export default page;
