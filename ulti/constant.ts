import { createThirdwebClient, defineChain, getContract } from "thirdweb";

const CLIENT_ID = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
    clientId: CLIENT_ID as string,
})

export const chain = defineChain(17000);
export const OWNER = "0x58c98B2Ae3BBF7241A3E0211b5912474d7BfEC27"
export const CONTRACT_ADDRESS = "0x659CA8696Ae5808b894c38970469e3d31AD5bd89";

const contractABI = [
  {
    "type": "constructor",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "CertificateAdded",
    "inputs": [
      {
        "type": "uint256",
        "name": "certTypeID",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "email",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateDisabled",
    "inputs": [
      {
        "type": "uint256",
        "name": "certID",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CertificateTypeAdded",
    "inputs": [
      {
        "type": "string",
        "name": "certType",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "string[]",
        "name": "info",
        "indexed": false,
        "internalType": "string[]"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SubAdminAdded",
    "inputs": [
      {
        "type": "address",
        "name": "newSubAdmin",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SubAdminRemoved",
    "inputs": [
      {
        "type": "address",
        "name": "oldSubAdmin",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "addCertificate",
    "inputs": [
      {
        "type": "uint256",
        "name": "certTypeID",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "email",
        "internalType": "string"
      },
      {
        "type": "string[]",
        "name": "info",
        "internalType": "string[]"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addCertificateType",
    "inputs": [
      {
        "type": "string",
        "name": "certType",
        "internalType": "string"
      },
      {
        "type": "string[]",
        "name": "info",
        "internalType": "string[]"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addCertificates",
    "inputs": [
      {
        "type": "uint256[]",
        "name": "certTypeIDs",
        "internalType": "uint256[]"
      },
      {
        "type": "string[]",
        "name": "emails",
        "internalType": "string[]"
      },
      {
        "type": "string[][]",
        "name": "infos",
        "internalType": "string[][]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addSubAdmin",
    "inputs": [
      {
        "type": "address",
        "name": "_newSubAdmin",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "certCount",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "certTypeCount",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "certificateTypes",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "certType",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "infos",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "certificates",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "certTypeID",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "email",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "infos",
        "internalType": "string"
      },
      {
        "type": "bool",
        "name": "isActive",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "disableCertificate",
    "inputs": [
      {
        "type": "uint256",
        "name": "certId",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "emailCertiCount",
    "inputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "emailToCerts",
    "inputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "removeSubAdmin",
    "inputs": [
      {
        "type": "address",
        "name": "_oldSubAdmin",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "subAdminAddresses",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "subAdminAddressesLength",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "subAdmins",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  }
] as const;

export const CONTRACT = getContract({
    client: client,
    chain: chain,
    address: CONTRACT_ADDRESS,
    abi: contractABI,
})

// struct GraduateInfo {
//         string country;          // Nước
//         uint256 logoId;          // ID logo (có thể liên kết đến hình ảnh logo)
//         string issuer;           // Người cấp bằng (tên tổ chức/trường)
//         string level;            // Level bằng (ví dụ: Cử nhân, Thạc sĩ, Tiến sĩ)
//         string major;            // Ngành học
//         string name;             // Tên học viên
//         string dateOfBirth;      // Ngày sinh (có thể dùng định dạng chuỗi hoặc timestamp)
//         uint256 graduationYear;   // Năm tốt nghiệp
//         string grade;            // Xếp loại tốt nghiệp (ví dụ: Giỏi, Khá, Trung bình)
//         string trainingType;     // Hình thức đào tạo (ví dụ: Chính quy, Tại chức, Từ xa)
//         string issueDate;        // Ngày cấp bằng (có thể dùng định dạng chuỗi hoặc timestamp)
//         string issuerSignatureId; // ID chữ ký người cấp (có thể liên kết đến chữ ký số)
//         string companySeal;      // Dấu mộc công ty (có thể liên kết đến hình ảnh dấu mộc)
//         string serialNumber;     // Số hiệu bằng
//         string registrationNumber; // Số vào sổ cấp bằng
// }
