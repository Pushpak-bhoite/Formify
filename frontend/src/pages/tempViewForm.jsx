import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

export default function FormDisplay({ form }) {
  const { toast } = useToast()
  const [responses, setResponses] = useState({})

  const handleChange = (questionIndex, value) => {
    setResponses({ ...responses, [questionIndex]: value })
  }

  const handleCheckboxChange = (questionIndex, option, checked) => {
    const updatedOptions = responses[questionIndex] || []
    if (checked) {
      setResponses({ ...responses, [questionIndex]: [...updatedOptions, option] })
    } else {
      setResponses({
        ...responses,
        [questionIndex]: updatedOptions.filter((item) => item !== option),
      })
    }
  }

  const handleSubmit = async () => {
    try {
      const responseData = {
        formId: form._id,
        responses,
      }

      await axios.post('http://localhost:3000/submit-response', responseData)
      toast({
        title: 'Response Submitted',
        description: 'Your responses have been saved.',
      })
    } catch (error) {
      console.error('Error submitting response:', error)
      toast({
        title: 'Submission Error',
        description: 'There was a problem submitting your response.',
        variant: 'destructive',
      })
    }
  }

  const renderInputField = (question, index) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            placeholder="Your answer"
            onChange={(e) => handleChange(index, e.target.value)}
          />
        )

      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox
                  id={`q${index}-option-${optionIndex}`}
                  onCheckedChange={(checked) => handleCheckboxChange(index, option, checked)}
                />
                <label htmlFor={`q${index}-option-${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        )

      case 'radio':
        return (
          <RadioGroup onValueChange={(value) => handleChange(index, value)}>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} />
                <label htmlFor={`q${index}-option-${optionIndex}`}>{option}</label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'fileUpload':
        return (
          <Input type="file" onChange={(e) => handleChange(index, e.target.files[0])} />
        )

      case 'dropdown':
        return (
          <Select onValueChange={(value) => handleChange(index, value)}>
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
        )

      default:
        return null
    }
  }

  return (
    <div className="w-screen min-h-screen pt-5 bg-gray-100">
      <div className="container md:w-3/5 mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
        <p className="mb-4">{form.description}</p>

        {form.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-medium mb-2">{question.question}</p>
            {renderInputField(question, index)}
          </div>
        ))}

        <Button onClick={handleSubmit} className="w-full mt-4">
          Submit Responses
        </Button>
      </div>
    </div>
  )
}
