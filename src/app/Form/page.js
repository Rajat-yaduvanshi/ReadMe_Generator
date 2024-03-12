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
  
    return markdown;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedMarkdown = generateMarkdown();
    setMarkdownContent(generatedMarkdown);
    // You can do something with the generated Markdown content here.
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Work</label>
          {formData.work.map((workItem, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`work-${index}-projectName`}
                value={workItem.projectName}
                onChange={handleChange}
                placeholder={`Project Name ${index + 1}`}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name={`work-${index}-projectLink`}
                value={workItem.projectLink}
                onChange={handleChange}
                placeholder={`Project Link ${index + 1}`}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => handleRemoveWorkItem(index)}
                className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWorkItem}
            className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Add Work Item
          </button>
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





