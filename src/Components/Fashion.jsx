import React, { useState } from "react";

const Fashion = () => {
    const [file, setFile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setFile(imageUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please upload an image first!");
            return;
        }

        const formData = new FormData();
        const fileBlob = await fetch(file).then((res) => res.blob());
        formData.append("file", fileBlob, "uploaded_image.jpg");

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Received recommendations:", data);
            setRecommendations(data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        }
    };

    return (
        <>
            <div className="sm:w-[32rem] shadow-blue-100 mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
                <div className="relative bg-blue-600 py-6 pl-8 text-xl font-semibold uppercase tracking-wider text-white">
                    Upload Files
                </div>
                <div className="space-y-4 px-8 py-10">
                    <div className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10">
                        <p className="mt-4 text-center text-xl font-medium text-gray-800">
                            Drop Files here or
                            <label className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                browse
                            </label>
                        </p>
                        {file && (
                            <img
                                src={file}
                                alt="Uploaded"
                                className="mt-4 rounded-lg h-40 w-40 object-cover"
                            />
                        )}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 rounded-full bg-blue-600 px-10 py-2 font-semibold text-white"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {recommendations.length > 0 && (
                <div className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-md text-center">
                            <h2 className="font-serif text-2xl font-bold sm:text-3xl">Our featured Product</h2>
                            <p className="mt-4 text-base text-gray-700">Discover the latest innovation in our collection, crafted with precision and designed for excellence. Experience unmatched quality and functionality that elevates your everyday life.</p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                            {recommendations.map((image, index) => (
                                <article className="relative">
                                    <div className="aspect-square overflow-hidden">
                                        <img key={index} className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300" src={`http://127.0.0.1:5000/${image}`} alt={`Recommendation ${index}`} />
                                    </div>
                                    <div className="mt-4 flex items-start justify-between">
                                        <div className="">
                                            <h3 className="text-xs font-semibold sm:text-sm md:text-base">
                                                <a href="#" title="" className="cursor-pointer">
                                                    Product {index + 1}
                                                </a>
                                            </h3>

                                        </div>

                                        <div className="text-right">
                                            <del className="mt-px text-xs font-semibold text-gray-600 sm:text-sm"> ₹79.00 </del>
                                            <p className="text-xs font-normal sm:text-sm md:text-base">₹99.00</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Fashion;
