"use client";
import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";

const page = () => {
  const [formData, setFormData] = useState({
    projectTitle: '', // Added for project's title
    subtitle: '',
    liveProjectLink: '', // Added for live project link
    projectDescription: '', // Added for project description
    tableOfContents: '', // Added for table of contents
    frameworks: '',
    installInstructions: '', // Added for installation instructions
    howToUse: '', // Added for how to use the project
    contributors: [],
    imageUpload: null, // Added for image upload (initialize as null)
   
    credits: '', // Added for credits



    
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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Handle file upload, you can use FormData or any other method to manage the file.
  };

  const generateMarkdown = () => {
    let markdown = `# ${formData.projectTitle}\n\n`;
    let sectionCounter = 1; // Initialize section counter
  
    // Initialize the table of contents
    let tableOfContents = "";
  
    // Add section headers and content
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
      tableOfContents += `${sectionCounter}. [How to Install and Run the Project](#how-to-install-and-run-the-project)\n`;
      markdown += `## ${sectionCounter}. How to Install and Run the Project\n\n`;
      markdown += "```shell\n"; // Opening code block for shell/command-line
      markdown += formData.installInstructions + "\n";
      markdown += "```\n\n"; // Closing code block
      sectionCounter++;
    }
    if (formData.howToUse) {
      tableOfContents += `${sectionCounter}. [How to Use the Project](#how-to-use-the-project)\n`;
      markdown += `## ${sectionCounter}. How to Use the Project\n${formData.howToUse}\n\n`;
      sectionCounter++;
    }
    if (formData.credits) {
      tableOfContents += `${sectionCounter}. [Include Credits](#include-credits)\n`;
      markdown += `## ${sectionCounter}. Include Credits\n${formData.credits}\n\n`;
      sectionCounter++;
    }
    if (formData.contributers) {
      tableOfContents += `${sectionCounter}. [Include Contributors](#include-contributors)\n`;
      markdown += `## ${sectionCounter}. Include Contributors\n${formData.contributer}\n\n`;
      sectionCounter++;
    }
  
    // Insert the table of contents at the beginning of the document
    markdown = `# Table of Contents\n${tableOfContents}\n` + markdown;
  
    return markdown;
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedMarkdown = generateMarkdown();
    setMarkdownContent(generatedMarkdown);
    console.log(generatedMarkdown);
  };

  const [formFields, setFormFields] = useState([
    { id: 'projectTitle', label: 'Project Title', isMultiLine: false },
    { id: 'projectDescription', label: 'Project Description', isMultiLine: true },
    { id: 'installInstructions', label: 'How to Install and Run the Project', isMultiLine: true },
    { id: 'howToUse', label: 'How to Use the Project', isMultiLine: true },
    { id: 'credits', label: 'Include Credits', isMultiLine: true },
    { id: 'liveProjectLink', label: 'Live Project Link', isMultiLine: false },
    { id: 'imageUpload', label: 'Upload Image', isMultiLine: false },
    { id: 'contributorName', label: 'Contributor Name', isMultiLine: false },
    { id: 'contributorGitHub', label: 'Contributor GitHub Profile', isMultiLine: false },
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
            {field.id.startsWith("contributor") ? (
              formData.contributors.map((contributor, index) => (
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
                </div>
              ))
            ) : field.isMultiLine ? (
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40 focus:outline-none focus:border-blue-500"
                rows="6"
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
