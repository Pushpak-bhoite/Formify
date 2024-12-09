
import React, { useEffect, useState } from 'react';
import { PlusCircle, FileText, BarChart2, Edit, Trash2, Trash2Icon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useParams } from 'react-router-dom';
import { Copy } from 'lucide-react';

import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {

  const { userId } = useParams();
  const [recentForms, setRecentForms] = useState()
  console.log('userId', userId)

  

  useEffect(() => {
    async function getUserForms() {
      try {
        const response = await axios.get(`http://localhost:3000/user-forms/${userId}`)
        const rev = [...response?.data.forms].reverse()
        setRecentForms(rev)
        console.log('response', response)
      } catch (error) {
        console.log(error)
        toast({
          title: "Error",
          description: error?.response?.data?.error || "Invalid email or password.",
          variant: "destructive",
        })
      }
    }
    getUserForms()
  }, [])

  const copyLink = (formId) => {
    const link = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        console.log('Link copied to clipboard:', link);
        // alert('Link copied to clipboard!');
        toast({
          title: "Success",
          description: "Link copied to clipboard!.",
        })
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        toast({
          title: "Error",
          description: "Failed to copy url.",
          variant: "destructive",
        })
      });
  };

  const deleteForm = async (formId) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
  
    try {
      await axios.delete(`http://localhost:3000/forms/${formId}`);
      toast({
        title: "Success",
        description: "Form deleted successfully!",
      });
  
      // Update the recentForms state to reflect the deletion
      setRecentForms((prevForms) => prevForms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error("Error deleting form:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to delete the form.",
        variant: "destructive",
      });
    }
  };
  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Form Creator Dashboard</h1>

      <div className="mb-8  flex ">
        <Link className="ml-auto w-full sm:w-auto " to={`/create-form`}>
          <Button className=" bg-blue-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Form
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Forms</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentForms?.map((form) => (
            <Card key={form._id}>
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>
                  Last edited: {new Date(form.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Questions {form?.questions?.length}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <div  className='flex gap-2'>
                  <Button variant="outline" size="sm" onClick={() => copyLink(form?._id)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={()=>deleteForm(form._id)} >
                    <Trash2Icon color='red' className=" mr-2 h-4 w-4" /> Delete Form
                  </Button>
                </div>

                <div className="flex justify-between w-full">
                  <Link to={`/form-responses/${form?._id}`}>
                    <Button variant="outline" size="sm">
                      <BarChart2 className="mr-2 h-4 w-4" /> View Responses
                    </Button>
                  </Link>

                  <Link to={`/forms/${form?._id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit Form
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}

        </div>
      </div>

      {/* <div>
        <h2 className="text-2xl font-semibold mb-4">All Forms</h2>
        <div className="flex items-center space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search forms..."
            className="max-w-sm"
          />
          <Button variant="secondary">
            <FileText className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Form Title</th>
                <th className="text-left p-3">Responses</th>
                <th className="text-left p-3">Last Edited</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentForms?.map((form) => (
                <tr key={form.id} className="border-b last:border-b-0">
                  <td className="p-3">{form.title}</td>
                  <td className="p-3">{form.responses}</td>
                  <td className="p-3">{form.lastEdited}</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <BarChart2 className="mr-2 h-4 w-4" /> Responses
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;

