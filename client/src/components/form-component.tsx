
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import TextArea from "./ui/TextArea"
import { redirect } from "next/navigation"
import SubmitButton from "./SubmitButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"



export async function FormComponent() {
  
  const a = async (formData: FormData) => {
    "use server"
    const name = formData.get("username")
    const lang = formData.get("language")
    const stdin = formData.get("stdin")
    const code = formData.get("code")
   
  
    if (!name || !lang ||  !code) {
      return;
    }
    

  const codeDetail = {
    name,
    lang,
    stdin:stdin ? stdin : "",
    code
  }


    const res = await fetch(`${process.env.URL}/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(codeDetail)
    })
    console.log(res.status)
    if (res.ok) {
      return redirect("/entries")
    }
    else {

      console.log("error")
    }

    return 4
  }
  return (
    <Card key="1" className="w-full  mx-auto dark">
      <CardHeader>
        <CardTitle className="text-center text-white">Enter Details</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 flex-col">
        <form action={a} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-8">
              <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
                <span className="text-gray-400 mr-2">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="flex-1 w-10 bg-gray-700 text-white outline-none h-12" // Adjusted height here
                  required
                />
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
                <span className="text-gray-400 mr-2 ">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </span>

                <Select name="language" required>
                  <SelectTrigger>
                    <SelectValue  placeholder={"Select a language"} />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    {["C", "C++", "Javascript", "Python", "Java"].map((language) => (
                      <SelectItem key={language} value={`${language}`}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-start bg-gray-700 rounded-md px-3 py-2">
              <span className="text-gray-400 mr-2 mt-[.2rem]">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <textarea
              
                name="stdin"
                placeholder={`Standard Input (stdin)\n----------------------\nRonit`}
                className="flex-1 bg-gray-700 text-white outline-none resize-none  h-56"
              />
            </div>

          </div>

          <div className="md:h-full">
            <div className="flex  bg-gray-700 rounded-md px-3 py-2 h-full  ">
              <span className="text-gray-400 mr-2 mt-[0.2rem] ">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </span>
              <TextArea />
            </div>
          </div>
          <div className="md:col-span-2">
            <SubmitButton />
          </div>
        </form>
      </CardContent>

    </Card>
  )
}
