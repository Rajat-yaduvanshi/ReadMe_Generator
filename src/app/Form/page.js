'use client'
import  { useState } from 'react';

import MDEditor from '@uiw/react-md-editor';

const page = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    work: [
      { projectName: '', projectLink: '' },
      { projectName: '', projectLink: '' },
      { projectName: '', projectLink: '' },
    ],
    frameworks: '',
    contactEmail: '',
    portfolioLink: '',
    aboutMe: '',
    resumeLink: '',
    funnyStatement: '',
  });

  const [markdownContent, setMarkdownContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('work')) {
      const [field, index, property] = name.split('-');
      const updatedWork = [...formData.work];
      updatedWork[index][property] = value;
      setFormData({
        ...formData,
        work: updatedWork,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddWorkItem = () => {
    setFormData({
      ...formData,
      work: [
        ...formData.work,
        { projectName: '', projectLink: '' }
      ]
    });
  };

  const handleRemoveWorkItem = (index) => {
    const updatedWork = [...formData.work];
    updatedWork.splice(index, 1);
    setFormData({
      ...formData,
      work: updatedWork,
    });
  };

  const generateMarkdown = () => {
    let markdown = `# ${formData.title}\n\n`;
    markdown += `## ${formData.subtitle}\n\n`;
  
    markdown += '### Work\n';
    formData.work.forEach((workItem, index) => {
      if (workItem.projectName && workItem.projectLink) {
        markdown += `- **Project Name ${index + 1}:** ${workItem.projectName}\n`;
        markdown += `  - **Project Link:** ${workItem.projectLink}\n`;
      }
    });
  
    if (formData.frameworks) {
      markdown += `### Frameworks, courses etc.\n${formData.frameworks}\n\n`;
    }
  
    if (formData.contactEmail) {
      markdown += `### Got something to say? Contact me at\n${formData.contactEmail}\n\n`;
    }
  
    if (formData.portfolioLink) {
      markdown += `### Portfolio Link\n[${formData.portfolioLink}](${formData.portfolioLink})\n\n`;
    }
  
    if (formData.aboutMe) {
      markdown += `### About Me\n${formData.aboutMe}\n\n`;
    }
  
    if (formData.resumeLink) {
      markdown += `### Resume Link\n[${formData.resumeLink}](${formData.resumeLink})\n\n`;
    }
  
    if (formData.funnyStatement) {
      markdown += `### Funny Statement\n${formData.funnyStatement}\n\n`;
    }
  
  // New fields
  if (formData.projectTitle) {
    markdown += `### Project's Title\n${formData.projectTitle}\n\n`;
  }

  if (formData.projectDescription) {
    markdown += `### Project Description\n${formData.projectDescription}\n\n`;
  }

  if (formData.tableOfContents) {
    markdown += `### Table of Contents (Optional)\n${formData.tableOfContents}\n\n`;
  }

  if (formData.installInstructions) {
    markdown += `### How to Install and Run the Project\n${formData.installInstructions}\n\n`;
  }

  if (formData.howToUse) {
    markdown += `### How to Use the Project\n${formData.howToUse}\n\n`;
  }

  if (formData.credits) {
    markdown += `### Include Credits\n${formData.credits}\n\n`;
  }

  if (formData.liveProjectLink) {
    markdown += `### Live Project Link\n[${formData.liveProjectLink}](${formData.liveProjectLink})\n\n`;
  }

  return markdown;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedMarkdown = generateMarkdown();
    setMarkdownContent(generatedMarkdown);
    console.log(generatedMarkdown);
  };

  const handleShowMarkdown = () => {
    // Display the Markdown content when the user clicks a button
    alert(markdownContent); // You can replace this with your preferred method for displaying the Markdown content.
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create a Page</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
  <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">
    Project Title
  </label>
  <input
    type="text"
    id="projectTitle"
    name="projectTitle"
    value={formData.projectTitle}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
  />
</div>

<div className="mb-4">
  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
    Project Description
  </label>
  <textarea
    id="projectDescription"
    name="projectDescription"
    value={formData.projectDescription}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40" // Adjust height as needed
  ></textarea>
</div>

<div className="mb-4">
  <label htmlFor="tableOfContents" className="block text-sm font-medium text-gray-700">
    Table of Contents (Optional)
  </label>
  <textarea
    id="tableOfContents"
    name="tableOfContents"
    value={formData.tableOfContents}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40" // Adjust height as needed
  ></textarea>
</div>

<div className="mb-4">
  <label htmlFor="installInstructions" className="block text-sm font-medium text-gray-700">
    How to Install and Run the Project
  </label>
  <textarea
    id="installInstructions"
    name="installInstructions"
    value={formData.installInstructions}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40" // Adjust height as needed
  ></textarea>
</div>

<div className="mb-4">
  <label htmlFor="howToUse" className="block text-sm font-medium text-gray-700">
    How to Use the Project
  </label>
  <textarea
    id="howToUse"
    name="howToUse"
    value={formData.howToUse}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40" // Adjust height as needed
  ></textarea>
</div>

<div className="mb-4">
  <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
    Include Credits
  </label>
  <textarea
    id="credits"
    name="credits"
    value={formData.credits}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40" // Adjust height as needed
  ></textarea>
</div>

<div className="mb-4">
  <label htmlFor="liveProjectLink" className="block text-sm font-medium text-gray-700">
    Live Project Link
  </label>
  <input
    type="url"
    id="liveProjectLink"
    name="liveProjectLink"
    value={formData.liveProjectLink}
    onChange={handleChange}
    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
  />
</div>

        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Show Markdown Button */}
      {markdownContent && (
        <div className="mt-4">
          <button
            onClick={handleShowMarkdown}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Show Markdown
          </button>
        </div>
      )}


      <MDEditor
        value={markdownContent}
        onChange={setMarkdownContent}
      />
       <MDEditor.Markdown source={generateMarkdown} style={{ whiteSpace: 'pre-wrap' }} />
      
    </div>
  );
};

export default page;





