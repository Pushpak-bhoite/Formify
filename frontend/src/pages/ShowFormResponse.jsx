import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { dummyResponses } from "./dummyData"

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function ShowFormResponses() {
    // Get all unique questions from the responses
    const { formId } = useParams();

    const [data, setData] = useState([]);
    useEffect(() => {
        async function getUserForms() {
            try {
                const response = await axios.get(`http://localhost:3000/show-responses/${formId}`)
                setData(response?.data)
                console.log('response', response)
            } catch (error) {
                console.log(error)
                toast({
                    title: "Error",
                    description: error?.response?.data?.error || "Failed to fectch data ",
                    variant: "destructive",
                })
            }
        }
        getUserForms()
    }, [formId])

    console.log(data)

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Form Responses</h1>
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle>Form Responses</CardTitle>
                </CardHeader>
                <CardContent>
                    {data?.length === 0 ? <h2>No responses</h2>
                        : <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Submitted At</TableHead>
                                    {data[0]?.answers.map((item, index) => (
                                        <TableHead key={index}>{item.required ? item.question +'(optional)': item.question}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.map((item, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{new Date(item?.submittedAt)?.toLocaleString()}</TableCell>
                                        {item?.answers?.map((ans, index) => {
                                            // const answer = response.answers.find(a => a.question === question)
                                            console.log(ans)
                                            return (
                                                <TableCell key={index}>
                                                    {ans.answer ? (
                                                        Array.isArray(ans.answer)
                                                            ? ans?.answer.join(', ')
                                                            : ans?.answer?.toString()
                                                    ) : '-'}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                </CardContent>
            </Card>
        </div>

    )
}





