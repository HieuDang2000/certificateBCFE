'use client';
import { TransactionButton, useActiveAccount, useActiveWallet, useReadContract } from "thirdweb/react";
import { CustomConnectButton } from "../page";
import { useEmail } from "../../../ulti/customHook/useEmail";
import React, { useEffect, useRef, useState } from 'react';
import { CONTRACT, OWNER } from "../../../ulti/constant";
import { owner } from "thirdweb/extensions/common";
import Loading, { CoolEffect } from "../../../ulti/component";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { Island_Moments } from "next/font/google";

function Login() {
    const account = useActiveAccount();
    const Wallet = useActiveWallet();

    return (
        <div className="flex justify-center mb-20">
            {account && Wallet ? <UserOrAdmin address={account.address} walletid={Wallet?.id} /> : <Description />}
        </div>
    );
}
function UserOrAdmin({ address, walletid }: { address: string, walletid: string | undefined }) {
    const { userEmail, loading } = useEmail();
    return (
        <>
            {loading ? <Loading /> : walletid == "inApp" ? <User /> : <AdminOrSub address={address} />}
        </>
    );
}
function SubOrSubing({ address }: { address: string }) {
    const { data, isLoading } = useReadContract({
        contract: CONTRACT,
        method: "subAdmins",
        params: [address]
    });


    return <>
        {isLoading ? <Loading /> : data ? <Sub /> : <Subbing />}
    </>
}

function AdminOrSub({ address }: { address: string }) {
    return <>
        {address == OWNER ? <CoolEffect><Admin /></CoolEffect> : <SubOrSubing address={address} />}
    </>
}
function GetSubAdd({ i }: { i: number }) {
    const { data, isLoading } = useReadContract({
        contract: CONTRACT,
        method: "subAdminAddressesLength",
        params: [BigInt(i)]
    });
}
const Modal = ({ isOpen, onClose, children }: { isOpen: any, onClose: any, children: any }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Clickable overlay to close the modal */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black opacity-50"
            />
            {/* Modal content */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                >
                    ❌
                </button>
                <div className="m-10">
                    {children}
                </div>
            </div>
        </div>
    );
};
function Admin() {
    const [isOpen1, setIsOpen1] = useState(false);
    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const [isOpen2, setIsOpen2] = useState(false);
    const openModal2 = () => setIsOpen2(true);
    const closeModal2 = () => setIsOpen2(false);

    const { data, isLoading, refetch: refetchCount } = useReadContract({
        contract: CONTRACT,
        method: "subAdminAddressesLength",
        params: []
    });
    console.log(data)
    const [Addre, setAddre] = useState<string>("");
    const [inputValueNumber, setInputValueNumber] = useState(0); // Initialize as empty string
    console.log(inputValueNumber)

    const handleInputNumberChange = (event: any) => {
        setInputValueNumber(event.target.value);
    };
    const handleInputAddreChange = (event: any) => {
        setAddre(event.target.value);
    };

    const { data: getadata, isLoading: addreLoad, refetch: getarefetch } = useReadContract({
        contract: CONTRACT,
        method: "subAdminAddresses",
        params: [BigInt(inputValueNumber)],
    });
    const { data: getcdata, isLoading: addrecLoad, refetch: getacrefetch } = useReadContract({
        contract: CONTRACT,
        method: "subAdmins",
        params: [Addre],
    });
    console.log(getcdata)
    return (
        <div className="bg-white p-8 rounded-lg shadow-md">

            <div className="m-4 text-2xl font-bold text-black">Admin DashBoard</div>
            <hr className=""></hr>
            <div className="text-xl text-black p-10">Address Authorized Count: {Number(data)}</div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Find Address</h2>
                <div className="flex space-x-4">
                    <input
                        type="number"
                        placeholder="Enter Number(from 0)"
                        onChange={handleInputNumberChange}
                        value={inputValueNumber}
                        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        onClick={() => {
                            openModal1()
                            getarefetch()
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" >
                        Find
                    </button>
                </div>
                <Modal isOpen={isOpen1} onClose={closeModal1}>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Address Account:</h2>
                        <div className="text-md text-black">{getadata ? getadata?.toString() : "Address Not Found"}</div>
                    </div>
                </Modal>

            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Check Address Authorized</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        onChange={handleInputAddreChange}
                        placeholder="Enter Address"
                        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        onClick={() => {
                            openModal2()
                            getacrefetch()
                        }}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md" >
                        Check
                    </button>
                </div>
                <Modal isOpen={isOpen2} onClose={closeModal2}>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Address Authorized Check:</h2>
                        <div className="text-xl text-gray-800">{getcdata ? "Authorized ✅" : "Not Authorized ❌"}</div>
                    </div>
                </Modal>
            </div>
            {/* Top Section: Authorize */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Authorize Address</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        onChange={handleInputAddreChange}
                        placeholder="Enter Address"
                        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <TransactionButton
                        transaction={() => prepareContractCall({
                            contract: CONTRACT,
                            method: "addSubAdmin",
                            params: [Addre]
                        })}
                        onTransactionConfirmed={() => {
                            refetchCount();
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                        Authorize
                    </TransactionButton>
                </div>

            </div>

            {/* Bottom Section: Unauthorize */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Unauthorize Address</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        onChange={handleInputAddreChange}
                        placeholder="Enter Address"
                        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <TransactionButton
                        transaction={() => prepareContractCall({
                            contract: CONTRACT,
                            method: "removeSubAdmin",
                            params: [Addre]
                        })}
                        onTransactionConfirmed={() => {
                            refetchCount();
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                        Unauthorize
                    </TransactionButton>
                </div>
            </div>

        </div >
    );
}
function Description() {
    return (
        <div className=" rounded-lg shadow-white shadow-lg p-6 md:p-8 max-w-3xl mx-auto
        transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-50 mb-4">
                Giải Pháp Quản Lý Chứng Chỉ Chuỗi Khối - Tương Lai An Toàn và Minh Bạch
            </h2>

            <p className="text-gray-100 mb-4">
                Công nghệ chuỗi khối mang đến cách mạng trong việc đảm bảo tính toàn vẹn và
                không thể thay đổi của chứng chỉ. Mọi bằng cấp, chứng nhận của bạn được lưu trữ
                an toàn, vĩnh viễn trên chuỗi khối, loại bỏ hoàn toàn nguy cơ gian lận hay mất mát.
            </p>

            <ul className="list-disc list-inside text-gray-100 mb-4">
                <li>
                    **Không Thể Làm Giả:** Chứng chỉ được bảo vệ bằng mã hóa mạnh mẽ, đảm bảo tính xác thực tuyệt đối.
                </li>
                <li>
                    **Xác Minh Dễ Dàng:**  Nhà tuyển dụng, đối tác có thể kiểm tra tính hợp lệ của chứng chỉ chỉ với vài cú nhấp chuột.
                </li>
                <li>
                    **Quyền Sở Hữu Đích Thực:**  Bạn là chủ sở hữu duy nhất, toàn quyền kiểm soát chứng chỉ của mình.
                </li>
            </ul>

            <p className="text-gray-100">
                Đón đầu tương lai với giải pháp quản lý chứng chỉ chuỗi khối ngay hôm nay!
            </p>
        </div>
    );
}
function InputCertForm() {
    const [results, setResults] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [inputValueNumber, setinputValueNumber] = useState(1);
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");

    const handleAddClick = () => {
        if (inputValue.trim() !== '') { // Prevent adding empty values
            setResults([...results, inputValue]);
            setInputValue(''); // Clear the input field
        }
    };

    const { data: gettypecount, isLoading: gtcload, refetch: gtcrefetch } = useReadContract({
        contract: CONTRACT,
        method: "certTypeCount",
        params: [],
    });
    const { data: ctname, isLoading: ctload, refetch: ctrefetch } = useReadContract({
        contract: CONTRACT,
        method: "certificateTypes",
        params: [BigInt(inputValueNumber - 1)],
    });

    console.log(inputValueNumber)
    console.log(ctname?.toString())
    function resetResult() {
        setResults([]);
    }

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md text-black">

            <h2 className="text-xl font-semibold my-2">Chose Certificate Type: ({gettypecount?.toString()} Type)</h2>
            <div className="flex space-x-4">
                {ctname ? <div className="">{ctname[0].toString()} </div> : <></>}
                <input
                    type="number"
                    min="1"
                    max={gettypecount?.toString()}
                    placeholder="Enter value"
                    value={inputValueNumber}
                    onChange={(e) => setinputValueNumber(e.target.valueAsNumber)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <h2 className="text-xl font-semibold my-2">Email</h2>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Enter value"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <h2 className="text-xl font-semibold my-2">Add Infos: {ctname ? <p className="text-gray-500 break-words ">The infos of this type: {ctname[1].toString()} </p> : <span></span>}</h2>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Add
                </button>
            </div>
            <h2 className="text-xl font-semibold m-2">Info Results:&nbsp;&nbsp;
                <button
                    onClick={resetResult}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Reset
                </button>
            </h2>

            <div className="m-4">
                {results.map((result, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {result}
                    </span>
                ))}
            </div>
            <div className="flex space-x-4  my-2">
                <TransactionButton
                    transaction={() => prepareContractCall({
                        contract: CONTRACT,
                        method: "addCertificate",
                        params: [BigInt(inputValueNumber - 1), email, results]
                    })}

                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Add Certificate
                </TransactionButton>
            </div>
        </div>
    );
}

function User() {
    let { userEmail, loading } = useEmail();
    if (userEmail == undefined)
        userEmail = "";

    const [inputValueNumber, setinputValueNumber] = useState(1);


    const { data: ccount, isLoading: cload, refetch: crefetch } = useReadContract({
        contract: CONTRACT,
        method: "emailCertiCount",
        params: [userEmail],
    });
    const { data: cid, isLoading: cidload, refetch: cidrefetch } = useReadContract({
        contract: CONTRACT,
        method: "emailToCerts",
        params: [userEmail, BigInt(inputValueNumber)],
    });

    let cerID = BigInt(0);
    if (cid)
        cerID = cid;
    const { data: ctdata, isLoading: ctload, refetch: ctrefetch } = useReadContract({
        contract: CONTRACT,
        method: "certificates",
        params: [cerID],
    });


    console.log(ctdata)

    return <div className="flex"> <div className="flex flex-col w-full mr-6">
        <h2 className="text-xl font-semibold my-2">Certificate Own: {ccount?.toString()}</h2>
        <div className="flex space-x-4 w-max">
            <input
                type="number"
                min="1"
                max={ccount?.toString()}
                placeholder="Enter value"
                value={inputValueNumber}
                onChange={(e) => setinputValueNumber(e.target.valueAsNumber)}
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
    </div>
        {ctdata && (ctdata[3].toString() == "true" ? (ctdata[0].toString() == "4" ? <PDFEditor texts={ctdata[2].split(",")} /> : <>{ctdata[2]}</>) : <>This certificate has been disable</>)}
    </div>
}

import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export const PDFEditor = ({ texts }: { texts: string[] }) => {
    const [pdfFile, setPdfFile] = useState<ArrayBuffer | null>(null);
    const [outputPdf, setOutputPdf] = useState<string>("");

    useEffect(() => {
        const fetchPdfFile = async () => {
            try {
                const response = await fetch('/certificate_template/qnu_certificate_template.pdf');
                const fileArrayBuffer = await response.arrayBuffer();
                setPdfFile(fileArrayBuffer);
            } catch (error) {
                console.error('Error fetching PDF file:', error);
            }
        };

        fetchPdfFile();
    }, []);

    useEffect(() => {
        const loadFont = async () => {
            const url = '/AndikaNewBasic-R.ttf'; // Replace with the actual URL or path to your font file
            const response = await fetch(url);
            const fontBytes = await response.arrayBuffer();
            return fontBytes;
        };
        const addTextToPdf = async () => {
            if (pdfFile && texts && texts.length > 0) {
                const pdfDoc = await PDFDocument.load(pdfFile);
                pdfDoc.registerFontkit(fontkit);
                const fontBytes = await loadFont();
                const customFont = await pdfDoc.embedFont(fontBytes);
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];
                const { width, height } = firstPage.getSize();

                // Add each text from the array at different positions
                firstPage.drawText(texts[0].toUpperCase(), {
                    x: 50,
                    y: height - 50, // Adjust Y position for each text
                    size: 15,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[1].toUpperCase(), {
                    x: 35,
                    y: height - 150, // Adjust Y position for each text
                    size: 16,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });

                firstPage.drawText("cấp", {
                    x: 190,
                    y: height - 180, // Adjust Y position for each text
                    size: 12,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });

                firstPage.drawText(texts[2].toUpperCase(), {
                    x: 140,
                    y: height - 210, // Adjust Y position for each text
                    size: 18,
                    font: customFont,
                    color: rgb(1, 0, 0),
                });
                firstPage.drawText(texts[3].toUpperCase(), {
                    x: 125,
                    y: height - 250, // nganh hoc
                    size: 16,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[4].toUpperCase(), {
                    x: 120,
                    y: height - 290, // ten ngành
                    size: 14,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[5], {
                    x: 140,
                    y: height - 318, // nten
                    size: 12,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[6], {
                    x: 190,
                    y: height - 346, // nam
                    size: 12,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[7], {
                    x: 190,
                    y: height - 372, // Adjust Y position for each text
                    size: 12,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[8], {
                    x: 175,
                    y: height - 397, // Adjust Y position for each text
                    size: 12,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${texts[9]}, ${texts[10]}`, {
                    x: 175,
                    y: height - 432, // Adjust Y position for each text
                    size: 12,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`HIỆU TRƯỞNG`, {
                    x: 185,
                    y: height - 452, // Adjust Y position for each text
                    size: 14,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(texts[11], {
                    x: 230,
                    y: height - 552, // Adjust Y position for each text
                    size: 14,
                    font: customFont,
                    color: rgb(1, 0, 0),
                });
                firstPage.drawText(texts[12], {
                    x: 80,
                    y: height - 541, // Adjust Y position for each text
                    size: 18,
                    font: customFont,
                    color: rgb(1, 0, 0),
                });
                firstPage.drawText(texts[13], {
                    x: 150,
                    y: height - 561, // Adjust Y position for each text
                    size: 10,
                    font: customFont,
                    color: rgb(0, 0, 0),
                });



                const pdfBytes = await pdfDoc.save();
                const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
                setOutputPdf(URL.createObjectURL(pdfBlob));
            }
        };

        addTextToPdf();
    }, [pdfFile, texts]);

    return (
        <div>
            {outputPdf ? (
                <iframe src={outputPdf} width="530px" height="800px" />
            ) : (
                <div>Loading Certificate...</div>
            )}
        </div>
    );
};


import * as XLSX from 'xlsx'; // Import xlsx library for CSV parsing

function CSVReaderComponent() {

    const [isOpen1, setIsOpen1] = useState(false);
    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const [certTypes, setCertTypes] = useState<bigint[]>([]);
    const [emails, setEmails] = useState<string[]>([]);
    const [restData, setRestData] = useState<string[][]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const workbook = XLSX.read(e.target?.result, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get data as array of arrays

                const types: bigint[] = [];
                const emails: string[] = [];
                const rest: string[][] = [];

                data.forEach((row: any) => {
                    if (row.length > 1) { // Ensure enough columns
                        const temRow: string[] = [];
                        types.push(BigInt(row[0] - 1));
                        emails.push(row[1].toString());
                        temRow.push(row.slice(2).map(String));
                        rest.push(temRow);
                    }
                });

                setCertTypes(types);
                setEmails(emails);
                setRestData(rest);
            };

            reader.readAsArrayBuffer(file);
        }
    };
    console.log(certTypes, emails, restData)

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="mb-4"
            />

            <div className="flex space-x-4  my-2">
                <TransactionButton
                    transaction={() => prepareContractCall({
                        contract: CONTRACT,
                        method: "addCertificates",
                        params: [certTypes, emails, restData]
                    })}
                    onError={openModal1}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Add Certificates from File
                </TransactionButton>
            </div>
            <Modal isOpen={isOpen1} onClose={closeModal1}>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Lỗi:</h2>
                    <div className="text-md text-black">Import không thành công</div>
                </div>
            </Modal>

            {/* Similar display for emails and restData */}
        </div>
    );
}
function AddOption() {
    const [activeTab, setActiveTab] = useState(0);
    const { data: ctname, isLoading: ctload, refetch: ctrefetch } = useReadContract({
        contract: CONTRACT,
        method: "certCount",
        params: [],
    });
    return <>
        <div>
            <h2 className="text-xl font-semibold my-2">Total Certificate Added: ({ctname?.toString()} )</h2>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab(0)}
                    className={`px-4 py-2 rounded-t ${activeTab === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Add Certificate Form
                </button>
                <button
                    onClick={() => setActiveTab(1)}
                    className={`px-4 py-2 rounded-t ${activeTab === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Add Certificates from File
                </button>
                <button
                    onClick={() => setActiveTab(2)}
                    className={`px-4 py-2 rounded-t ${activeTab === 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Disable Certificates from File
                </button>
            </div>
            <div>
                {activeTab === 0 && (
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <InputCertForm />
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="p-4 bg-gray-300 rounded-lg shadow-md">
                        <CSVReaderComponent />
                    </div>
                )}
                {activeTab === 2 && (
                    <div className="p-4 bg-gray-300 rounded-lg shadow-md">
                        <DisableCertiForm total={ctname?.toString()} />
                    </div>
                )}
            </div>
        </div>
    </>
}

function DisableCertiForm({ total }: { total: string | undefined }) {
    const [isOpen1, setIsOpen1] = useState(false);
    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const [type, setType] = useState(0);
    const { data: ctname, isLoading: ctload, refetch: ctrefetch } = useReadContract({
        contract: CONTRACT,
        method: "certificates",
        params: [BigInt(type)],
    });

    console.log("type", type)
    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">

            <h2 className="text-xl font-semibold my-2">Addredd Certificate</h2>
            <div className="flex space-x-4">
                <input
                    type="number"
                    min="0"
                    max={total}
                    placeholder="Enter value"
                    value={type}
                    onChange={(e) => setType(e.target.valueAsNumber)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="flex space-x-4  my-2">
                <TransactionButton
                    transaction={() => prepareContractCall({
                        contract: CONTRACT,
                        method: "disableCertificate",
                        params: [BigInt(type)]
                    })}

                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Disable Certificate
                </TransactionButton>
                <button
                    onClick={() => {
                        openModal1()
                        ctrefetch()
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md" >
                    Check
                </button>
                <Modal isOpen={isOpen1} onClose={closeModal1}>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Account Detail:</h2>
                        {ctname ? (
                            <>
                                <div className="text-md text-black">type: {ctname[0].toString()}</div>
                                <div className="text-md text-black">email: {ctname[1].toString()}</div>
                                <div className="text-md text-black">status: {ctname[3].toString()}</div>
                                <div className="text-md text-black">infos: {ctname[2].toString()}</div>
                            </>
                        ) : (
                            <div className="">Not Found</div>
                        )}
                    </div>
                </Modal>
            </div>


        </div>
    );
}
//country         
//  logoId         
//  issuer          
//  level           
//  major           
//  name            
//  dateOfBirth     
//  graduationYear  
//  grade           
//  trainingType    
//  issueDate       
//  issuerSignatureId
//  companySeal     
//  serialNumber    
//  registrationNumber

function Sub() {
    const [activeTab, setActiveTab] = useState(0);
    return <>
        <div className="w-full">
            <div className="flex space-x-4 mb-4 ">
                <button
                    onClick={() => setActiveTab(0)}
                    className={`px-4 py-2 rounded-t ${activeTab === 0 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Add Certificate
                </button>
                <button
                    onClick={() => setActiveTab(1)}
                    className={`px-4 py-2 rounded-t ${activeTab === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Add Certificate Type
                </button>
            </div>

            <div>
                {activeTab === 0 && (
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <AddOption />
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="flex items-center justify-center p-4 bg-gray-400 rounded-lg shadow-md">
                        <AddCertType />
                    </div>
                )}
            </div>
        </div>
    </>
}
function AddCertType() {
    const [isOpen1, setIsOpen1] = useState(false);
    const openModal1 = () => setIsOpen1(true);
    const closeModal1 = () => setIsOpen1(false);

    const [results, setResults] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [type, setType] = useState("");

    const handleAddClick = () => {
        if (inputValue.trim() !== '') { // Prevent adding empty values
            setResults([...results, inputValue]);
            setInputValue(''); // Clear the input field
        }
    };

    function resetResult() {
        setResults([]);
    }

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md w-max">

            <h2 className="text-xl font-semibold my-2">Add Certificate Type Name</h2>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Enter value"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <h2 className="text-xl font-semibold my-2">Add Infos:</h2>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Add
                </button>
            </div>
            <h2 className="text-xl font-semibold m-2">Info Results:&nbsp;&nbsp;
                <button
                    onClick={resetResult}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Reset
                </button>
            </h2>
            <div className="m-4">
                {results.map((result, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {result}
                    </span>
                ))}
            </div>
            <div className="flex space-x-4  my-2">
                <TransactionButton
                    transaction={() => prepareContractCall({
                        contract: CONTRACT,
                        method: "addCertificateType",
                        params: [type, results]
                    })}
                    onTransactionConfirmed={() => {
                        openModal1();
                        console.log("done")
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Add Certificate Type
                </TransactionButton>
            </div>
            <Modal isOpen={isOpen1} onClose={closeModal1}>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Certificate Type Added Status:</h2>
                    <div className="text-md text-black">Success ✅</div>
                </div>
            </Modal>

        </div>
    );
}
function Subbing() {
    return <>
        <div className=" rounded-lg shadow-white shadow-lg p-6 md:p-8 max-w-3xl mx-auto
        transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl  font-bold text-gray-50 mb-4">
                Bạn chưa có quyền truy cập
            </h2>
            <hr />
            <h2 className="p-10 text-xl  font-bold text-gray-50 mb-4">
                Liên hệ Fanpage để đăng ký: <a href="https://www.facebook.com/quanlychungchiqnu/">https://www.facebook.com/quanlychungchiqnu/</a>
                <hr></hr>Hoặc thông qua email để đăng ký: quanlychungchi@qnu.com
            </h2>
        </div>
    </>
}



export default Login;