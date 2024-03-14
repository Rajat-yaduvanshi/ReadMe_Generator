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
    markdown += `## Table of Contents\n`;
  
    const sections = [];
  
    // Create a table of contents entry for each section
    if (formData.projectDescription) {
      sections.push("Project Description");
    }
    if (formData.frameworks) {
      sections.push("Frameworks, Courses, etc.");
    }
    if (formData.liveProjectLink) {
      sections.push("Live Project Link");
    }
    if (formData.tableOfContents) {
      sections.push("Table of Contents");
    }
    if (formData.installInstructions) {
      sections.push("How to Install and Run the Project");
    }
    if (formData.howToUse) {
      sections.push("How to Use the Project");
    }
    if (formData.credits) {
      sections.push("Include Credits");
    }
    if (formData.contributers) {
      sections.push("Include Contributors");
    }
  
    // Generate the table of contents links
    sections.forEach((section) => {
      const sectionId = section.replace(/\s+/g, "-").toLowerCase();
      markdown += `- [${section}](#${sectionId})\n`;
    });
  
    // Add section headers and content
    if (formData.projectDescription) {
      markdown += `## Project Description\n${formData.projectDescription}\n\n`;
    }
    if (formData.frameworks) {
      markdown += `## Frameworks, Courses, etc.\n${formData.frameworks}\n\n`;
    }
    if (formData.liveProjectLink) {
      markdown += `## Live Project Link\n[${formData.liveProjectLink}](${formData.liveProjectLink})\n\n`;
    }
    if (formData.tableOfContents) {
      markdown += `## Table of Contents\n${formData.tableOfContents}\n\n`;
    }
    if (formData.installInstructions) {
      markdown += `## How to Install and Run the Project\n\n`;
      markdown += "```shell\n"; // Opening code block for shell/command-line
      markdown += formData.installInstructions + "\n";
      markdown += "```\n\n"; // Closing code block
    }
    if (formData.howToUse) {
      markdown += `## How to Use the Project\n${formData.howToUse}\n\n`;
    }
    if (formData.credits) {
      markdown += `## Include Credits\n${formData.credits}\n\n`;
    }
    if (formData.contributers) {
      markdown += `## Include Contributors\n${formData.contributer}\n\n`;
    }
  
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
    <div className="p-4 flex ">
      <div className="text-centermx-12">
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      <button
        onClick={toggleMarkdownEditor}
        className="py-2 px-4 rounded-md"
      >
        {showMarkdownEditor
          ? "Hide Markdown and Preview"
          : "Show Markdown and Preview"}
      </button>

   
      {renderMarkdownEditor()}
      {renderMarkdownPreview()}
    </div>
  );
};

export default page;
