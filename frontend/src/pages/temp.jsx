// 'use client'

// import { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import axios from 'axios'
// import { Switch } from '@/components/ui/switch'
// import { Copy, Tally1, Trash2 } from 'lucide-react'
// import { useParams } from 'react-router-dom'

// const questionTypes = [
//     { value: 'text', label: 'Text' },
//     { value: 'checkbox', label: 'Checkbox' },
//     { value: 'radio', label: 'Radio Button' },
//     { value: 'fileUpload', label: 'File Upload' },
//     { value: 'dropdown', label: 'Dropdown' },
// ]

// export default function ViewForm() {
//     const { toast } = useToast() // Toast hook
//     const [formTitle, setFormTitle] = useState('')
//     const [formDescription, setFormDescription] = useState('')
//     const [questions, setQuestions] = useState([])
//     const [formLink, setFormLink] = useState('')
//     const param = useParams();
//     console.log('param?.formId', param?.formId)
//     const addQuestion = () => {
//         setQuestions([...questions, { type: 'text', question: '', options: [], required: false }])
//     }

//     useEffect(() => {
//         async function getFormData() {

//             const response = await axios.get(`http://localhost:3000/forms/${param?.formId}`)
//             console.log('response', response)
//         }
//         getFormData();
//     })


//     const updateQuestion = (index, field, value) => {
//         const updatedQuestions = [...questions]
//         updatedQuestions[index][field] = value
//         setQuestions(updatedQuestions)
//     }

//     const deleteQuestion = (index) => {
//         console.log('index', index)
//         const updatedQuestions = [...questions] // to avoid direct updation fron state, took data to another variable  
//         updatedQuestions.splice(index)
//         setQuestions(updatedQuestions)
//     }

//     const addOption = (questionIndex) => {
//         const updatedQuestions = [...questions]
//         const newOptionIndex = updatedQuestions[questionIndex].options.length
//         updatedQuestions[questionIndex].options.push(`Option ${newOptionIndex + 1}`)
//         setQuestions(updatedQuestions)
//     }

//     const updateOption = (questionIndex, optionIndex, value) => {
//         const updatedQuestions = [...questions]
//         updatedQuestions[questionIndex].options[optionIndex] = value
//         setQuestions(updatedQuestions)
//     }

//     const saveForm = async () => {
//         try {
//             const formData = { title: formTitle, description: formDescription, questions }
//             console.log('Submitting form data:', formData)
//             formData.adminId = '67519a2a740b64286b60c3c0'
//             // API call to save the form
//             const response = await axios.post("http://localhost:3000/create-form", formData)
//             console.log('response', response?.data?.form?._id)
//             setFormLink(`http://localhost:5173/forms/${response?.data?.form?._id}`)
//             if (response.status === 201) {
//                 toast({
//                     title: "Form Created Successfully",
//                     description: "Your form has been saved.",
//                 })
//                 // Reset form after successful save
//                 setFormTitle('')
//                 setFormDescription('')
//                 setQuestions([])
//             }
//         } catch (error) {
//             console.log('Error saving form:', error)
//             toast({
//                 title: "Error",
//                 description: "There was a problem saving your form.",
//                 variant: "destructive",
//             })
//         }
//     }

//     const copyToClipboard = async () => {
//         try {
//             await navigator.clipboard.writeText(formLink)
//             toast({
//                 title: "Copied!",
//                 description: "URL has been copied to clipboard.",
//             })
//         } catch (err) {
//             toast({
//                 title: "Failed to copy",
//                 description: "Something went wrong while copying the URL.",
//                 variant: "destructive",
//             })
//         }
//     }

//     console.log('questions ->', questions)

//     const renderQuestionOptions = (question, index) => {
//         switch (question.type) {
//             case 'text':
//                 return <Input disabled placeholder="Text answer" />
//             case 'checkbox':
//                 return (
//                     <div className="space-y-2">
//                         {question.options.map((option, optionIndex) => (
//                             <div key={optionIndex} className="flex items-center space-x-2">
//                                 {(
//                                     <Checkbox id={`q${index}-option-${optionIndex}`} disabled />
//                                 )}
//                                 <Input
//                                     value={option}
//                                     onChange={(e) => updateOption(index, optionIndex, e.target.value)}
//                                     placeholder={`Option ${optionIndex + 1}`}
//                                 />
//                             </div>
//                         ))}
//                         <Button onClick={() => addOption(index)}>Add Option</Button>
//                     </div>
//                 )
//             case 'radio':
//                 return (
//                     <div className="space-y-2">
//                         <RadioGroup>
//                             {question.options.map((option, optionIndex) => (
//                                 <div key={optionIndex} className="flex items-center space-x-2">
//                                     <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} disabled />
//                                     <Input
//                                         value={option}
//                                         onChange={(e) => updateOption(index, optionIndex, e.target.value)}
//                                         placeholder={`Option ${optionIndex + 1}`}
//                                     />
//                                 </div>
//                             ))}
//                         </RadioGroup>
//                         <Button onClick={() => addOption(index)}>Add Option</Button>
//                     </div>
//                 )
//             case 'fileUpload':
//                 return <Input type="file" disabled />
//             case 'dropdown':
//                 return (
//                     <div className="space-y-2">
//                         <Select disabled>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select an option" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {question.options.map((option, optionIndex) => (
//                                     <SelectItem key={optionIndex} value={option || `option-${optionIndex + 1}`}>
//                                         {option || `Option ${optionIndex + 1}`}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                         {question.options.map((option, optionIndex) => (
//                             <Input
//                                 key={optionIndex}
//                                 value={option}
//                                 onChange={(e) => updateOption(index, optionIndex, e.target.value)}
//                                 placeholder={`Option ${optionIndex + 1}`}
//                             />
//                         ))}
//                         <Button onClick={() => addOption(index)}>Add Option</Button>
//                     </div>
//                 )
//             default:
//                 return null
//         }
//     }

//     return (
//         <div className='w-screen min-h-screen pt-5 bg-orange-100'>

//             <div className='flex md:w-3/5 mx-auto mb-3 space-x-2 mb-4"'>
//                 <Input value={formLink} readOnly placeholder="Generated URL will appear here" />
//                 <Button onClick={() => copyToClipboard()} disabled={!formLink}>
//                     <Copy className="mr-2 h-4 w-4" />
//                     Copy
//                 </Button>
//             </div>
//             <div className="container md:w-3/5 bg-orange-600 mx-auto p-4 rounded-md">

//                 <h1 className="text-2xl font-bold mb-4">Create a New Form</h1>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Form Details</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             <Input
//                                 placeholder="Form Title"
//                                 value={formTitle}
//                                 onChange={(e) => setFormTitle(e.target.value)}
//                             />
//                             <Textarea
//                                 placeholder="Form Description"
//                                 value={formDescription}
//                                 onChange={(e) => setFormDescription(e.target.value)}
//                             />
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="mt-6">
//                     <h2 className="text-xl font-semibold mb-2 text-white">Questions </h2>
//                     {questions.map((question, index) => (
//                         <Card key={index} className="mb-4 py-4">
//                             <CardContent className="space-y-4">
//                                 {/* select question type */}
//                                 <Select
//                                     value={question.type}
//                                     onValueChange={(value) => updateQuestion(index, 'type', value)}
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select question type" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {questionTypes.map((type) => (
//                                             <SelectItem key={type.value} value={type.value}>
//                                                 {type.label}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                                 <Input
//                                     placeholder="Question"
//                                     value={question.question}
//                                     onChange={(e) => updateQuestion(index, 'question', e.target.value)}
//                                 />
//                                 {renderQuestionOptions(question, index)}

//                                 <div className='flex flex-row-reverse items-center  gap-4 '>
//                                     <div className='flex items-center justify-center gap-3'>
//                                         <span>Required </span>
//                                         <Switch
//                                             checked={question.required}
//                                             onCheckedChange={(e) => updateQuestion(index, 'required', e)}
//                                         />
//                                     </div>
//                                     <Tally1 size={30} />
//                                     {/* <Tally1 size={} /> */}
//                                     <Trash2 color='red' onClick={() => deleteQuestion(index)} />
//                                 </div>

//                             </CardContent>
//                         </Card>
//                     ))}
//                     <Button onClick={addQuestion}>Add Question</Button>
//                 </div>

//                 <CardFooter className="mt-6">
//                     <Button onClick={saveForm} className="w-full">Save Form</Button>
//                 </CardFooter>
//             </div>
//         </div>
//     )
// }

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom" // For dynamic routing
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function RenderForm() {
  const { formId } = useParams() // Get formId from route parameters

  const [formData, setFormData] = useState(null)
  const [responses, setResponses] = useState({}) // To store user responses
  const [loading, setLoading] = useState(true)

  // Fetch form data
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/forms/${formId}`)
        console.log('response', response)
        setFormData(response.data.form)
        initializeResponses(response.data.questions)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching form data:", error)
        setLoading(false)
      }
    }
    fetchForm()
  }, [formId])

  // Initialize responses state with empty values
  const initializeResponses = (questions) => {
    const initialResponses = {}
    questions?.forEach((q, index) => {
      initialResponses[index] = q.type === "checkbox" ? [] : ""
    })
    setResponses(initialResponses)
  }

  // Handle response changes
  const handleResponseChange = (index, value) => {
    setResponses((prev) => ({ ...prev, [index]: value }))
  }

  const handleCheckboxChange = (index, option) => {
    setResponses((prev) => {
      const currentOptions = prev[index] || []
      if (currentOptions.includes(option)) {
        return { ...prev, [index]: currentOptions.filter((opt) => opt !== option) }
      } else {
        return { ...prev, [index]: [...currentOptions, option] }
      }
    })
  }

  const submitResponses = () => {
    console.log("User responses:", responses)
    // Post responses to your backend if required
  }

  if (loading) return <p>Loading form...</p>
  if (!formData) return <p>Form not found!</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{formData.title}</h1>
      <p className="mb-4">{formData.description}</p>

      {formData?.questions?.map((question, index) => (
        <div key={index} className="mb-6">
          <label className="block font-semibold mb-2">{question.question}</label>
          {question.type === "text" && (
            <Input
              type="text"
              placeholder="Your answer"
              value={responses[index] || ""}
              onChange={(e) => handleResponseChange(index, e.target.value)}
            />
          )}
          {question.type === "checkbox" && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <Checkbox
                    id={`q${index}-option-${optionIndex}`}
                    checked={responses[index]?.includes(option)}
                    onCheckedChange={() => handleCheckboxChange(index, option)}
                  />
                  <label htmlFor={`q${index}-option-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
          {question.type === "radio" && (
            <RadioGroup
              value={responses[index] || ""}
              onValueChange={(value) => handleResponseChange(index, value)}
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} />
                  <label htmlFor={`q${index}-option-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </RadioGroup>
          )}
          {question.type === "dropdown" && (
            <Select
              value={responses[index] || ""}
              onValueChange={(value) => handleResponseChange(index, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option, optionIndex) => (
                  <SelectItem key={optionIndex} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}

      <Button onClick={submitResponses}>Submit Responses</Button>
    </div>
  )
}
