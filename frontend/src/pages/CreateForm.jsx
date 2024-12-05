'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import axios from 'axios'

const questionTypes = [
  { value: 'text', label: 'Text' },
  { value: 'multipleChoice', label: 'Multiple Choice' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio Button' },
  { value: 'fileUpload', label: 'File Upload' },
  { value: 'dropdown', label: 'Dropdown' },
]

export default function FormCreator() {
  const { toast } = useToast() // Toast hook
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [questions, setQuestions] = useState([])

  const addQuestion = () => {
    setQuestions([...questions, { type: 'text', question: '', options: [] }])
  }

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index][field] = value
    setQuestions(updatedQuestions)
  }

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions]
    const newOptionIndex = updatedQuestions[questionIndex].options.length
    updatedQuestions[questionIndex].options.push(`Option ${newOptionIndex + 1}`)
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  const saveForm = async () => {
    try {
      const formData = { title: formTitle, description: formDescription, questions }
      console.log('Submitting form data:', formData)
      formData.adminId = '67519040740b64286b60c3bd'
      // API call to save the form
      const response = await axios.post("http://localhost:3000/create-form", formData)

      if (response.status === 201) {
        toast({
          title: "Form Created Successfully",
          description: "Your form has been saved.",
        })
        // Reset form after successful save
        setFormTitle('')
        setFormDescription('')
        setQuestions([])
      }
    } catch (error) {
      console.log('Error saving form:', error)
      toast({
        title: "Error",
        description: "There was a problem saving your form.",
        variant: "destructive",
      })
    }
  }

  const renderQuestionOptions = (question, index) => {
    switch (question.type) {
      case 'text':
        return <Input disabled placeholder="Text answer" />
      case 'multipleChoice':
      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                {question.type === 'multipleChoice' ? (
                  <RadioGroup>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} disabled />
                      <Label htmlFor={`q${index}-option-${optionIndex}`}>{option || `Option ${optionIndex + 1}`}</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Checkbox id={`q${index}-option-${optionIndex}`} disabled />
                )}
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            <Button onClick={() => addOption(index)}>Add Option</Button>
          </div>
        )
      case 'radio':
        return (
          <div className="space-y-2">
            <RadioGroup>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} disabled />
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
            </RadioGroup>
            <Button onClick={() => addOption(index)}>Add Option</Button>
          </div>
        )
      case 'fileUpload':
        return <Input type="file" disabled />
      case 'dropdown':
        return (
          <div className="space-y-2">
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option, optionIndex) => (
                  <SelectItem key={optionIndex} value={option || `option-${optionIndex + 1}`}>
                    {option || `Option ${optionIndex + 1}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {question.options.map((option, optionIndex) => (
              <Input
                key={optionIndex}
                value={option}
                onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
              />
            ))}
            <Button onClick={() => addOption(index)}>Add Option</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Form</h1>
      <Card>
        <CardHeader>
          <CardTitle>Form Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <Textarea
              placeholder="Form Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Questions</h2>
        {questions.map((question, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="space-y-4">
              <Select
                value={question.type}
                onValueChange={(value) => updateQuestion(index, 'type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Question"
                value={question.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
              />
              {renderQuestionOptions(question, index)}
            </CardContent>
          </Card>
        ))}
        <Button onClick={addQuestion}>Add Question</Button>
      </div>

      <CardFooter className="mt-6">
        <Button onClick={saveForm} className="w-full">Save Form</Button>
      </CardFooter>
    </div>
  )
}
