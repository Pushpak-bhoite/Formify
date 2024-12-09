import { useEffect, useState } from 'react'
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
import { Switch } from '@/components/ui/switch'
import { Copy, Tally1, Trash2 } from 'lucide-react'
import { useParams } from 'react-router-dom'

const questionTypes = [
    { value: 'text', label: 'Text' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Button' },
    { value: 'fileUpload', label: 'File Upload' },
    { value: 'dropdown', label: 'Dropdown' },
]

export default function ViewForm() {
    const { toast } = useToast() // Toast hook
    const [formTitle, setFormTitle] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [questions, setQuestions] = useState([])
    const [formLink, setFormLink] = useState('')
    const [formData, setFormData] = useState('')

    const param = useParams();

    useEffect(() => {
        async function getFormData() {

            const response = await axios.get(`http://localhost:3000/forms/${param?.formId}`)
            setFormData(response?.data?.form)
            let insertAnsField = response?.data?.form.questions;
            insertAnsField = insertAnsField.map((question) => {
                return question.answer = ''
            })
            setQuestions(response?.data?.form.questions)
            console.log('response', response)
        }
        getFormData();
    }, [])


    const handleAnswer = (index, value) => {
        const updatedQuestions = [...questions]
        updatedQuestions[index]['answer'] = value;
        setQuestions(updatedQuestions)
    }

    const saveForm = async () => {
        try {
            const formData = { title: formTitle, description: formDescription, questions }
            console.log('Submitting form data:', formData)
            formData.adminId = '67519a2a740b64286b60c3c0'
            // API call to save the form
            const response = await axios.post("http://localhost:3000/create-form", {
                formData, headers: {
                    'Content-type': "multipart/form-data"
                }
            })
            console.log('response', response?.data?.form?._id)
            setFormLink(`http://localhost:5173/forms/${response?.data?.form?._id}`)
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

    console.log('questions ->', questions)

    const renderQuestionOptions = (question, index) => {
        switch (question.type) {
            case 'text':
                return <Input placeholder="Text answer" onChange={(e) => handleAnswer(index, e.target.value)} />
            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                                {(
                                    <Checkbox id={`q${index}-option-${optionIndex}`} />
                                )}
                                <p>{option}</p>
                            </div>
                        ))}
                        {/* <Button onClick={() => addOption(index)}>Add Option</Button> */}
                    </div>
                )
            case 'radio':
                return (
                    <div className="space-y-2">
                        <RadioGroup>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} />
                                    {/* <Input
                                        value={option}
                                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                        placeholder={`Option ${optionIndex + 1}`}
                                    /> */}
                                    <p>{option}</p>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )
            case 'fileUpload':
                return <Input type="file" />
            case 'dropdown':
                return (
                    <div className="space-y-2">
                        <Select >
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
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className='w-screen min-h-screen pt-5 bg-orange-100'>
            <div className="container md:w-3/5 bg-orange-600 mx-auto p-4 rounded-md">

                <h1 className="text-4xl font-bold mb-4 text-center"  >{formData?.title}</h1>
                <p className='text-muted underline text-center'>{formData?.description}</p>


                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-white">Questions </h2>
                    {questions.map((question, index) => (
                        <Card key={index} className="mb-4 py-4">
                            <CardContent className="space-y-4">
                                {/* select question type */}
                                <p>{question?.question} <span className='text-red-600'> {question.required ? '*' : ""}</span> </p>
                                {renderQuestionOptions(question, index)}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <CardFooter className="mt-6">
                    <Button onClick={saveForm} className="w-full">Save Form</Button>
                </CardFooter>
            </div>
        </div>
    )
}


// ----------------------------------------------------------------------------------


const saveForm = async () => {
    try {
        const ansArr = questions.map((item) => {
            return { question: item.question, answer: item.answer, type: item.type }
        })
        const payload = { formId: formData._id, answers: ansArr };
        console.log('Submitting form data:', ansArr);


        const response = await axios.post("http://localhost:3000/form-response", payload);
        console.log('response', response?.data?.form?._id);
        if (response.status === 201) {
            toast({
                title: "Form Created Successfully",
                description: "Your form has been saved.",
            });

            // Reset form after successful save
            // setFormTitle('');
            // setFormDescription('');
            // setQuestions([]);
        }
    } catch (error) {
        console.error('Error saving form:', error);
        toast({
            title: "Error",
            description: "There was a problem saving your form.",
            variant: "destructive",
        });
    }
};

//   --------------------------------------------------------------------
const saveForm = async () => {
    try {
        const formData = new FormData();
        // Append the form ID
        formData.append('formId', formData._id);
        // Append each question and its answer
        questions.forEach((item, index) => {
            formData.append(`answers[${index}][question]`, item.question);
            formData.append(`answers[${index}][type]`, item.type);
            formData.append(`answers[${index}][answer]`, item.answer); // File object
        });

        console.log('FormData contents:');
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        const response = await axios.post("http://localhost:3000/form-response", formData);

        console.log('response', response.data);
        if (response.status === 201) {
            toast({
                title: "Form Submitted Successfully",
                description: "Your form has been saved.",
            });
        }
    } catch (error) {
        console.error('Error saving form:', error);
        toast({
            title: "Error",
            description: "There was a problem saving your form.",
            variant: "destructive",
        });
    }
};
