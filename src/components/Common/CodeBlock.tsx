import { Tooltip, Modal } from "antd"
import { CheckIcon, ClipboardIcon, EyeIcon, Maximize2Icon } from "lucide-react"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface Props {
  language: string
  value: string
}

export const CodeBlock: FC<Props> = ({ language, value }) => {
  const [isBtnPressed, setIsBtnPressed] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const { t } = useTranslation("common")

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setIsBtnPressed(true)
    setTimeout(() => {
      setIsBtnPressed(false)
    }, 4000)
  }

  const handlePreview = () => {
    setPreviewVisible(true)
  }

  const handlePreviewClose = () => {
    setPreviewVisible(false)
  }

  return (
    <>
      <div className="code relative text-base font-sans codeblock bg-zinc-950 rounded-md overflow-hidden">
        <div className="flex bg-gray-800 items-center justify-between py-1.5 px-4">
          <span className="text-xs lowercase text-gray-200">{language}</span>

          <div className="flex items-center">
            {language.toLowerCase() === "html" && (
              <Tooltip title={t("preview")}>
                <button
                  onClick={handlePreview}
                  className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-gray-200 hover:bg-gray-700 hover:text-gray-100 focus:outline-none">
                  <EyeIcon className="h-4 w-4" />
                </button>
              </Tooltip>
            )}
            <Tooltip title={t("copyToClipboard")}>
              <button
                onClick={handleCopy}
                className="flex gap-1.5 items-center rounded bg-none p-1 text-xs text-gray-200 hover:bg-gray-700 hover:text-gray-100 focus:outline-none">
                {!isBtnPressed ? (
                  <ClipboardIcon className="h-4 w-4" />
                ) : (
                  <CheckIcon className="h-4 w-4 text-green-400" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          PreTag="div"
          customStyle={{
            margin: 0,
            width: "100%",
            background: "transparent",
            padding: "1.5rem 1rem"
          }}
          lineNumberStyle={{
            userSelect: "none"
          }}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "var(--font-mono)"
            }
          }}>
          {value}
        </SyntaxHighlighter>
      </div>
      {previewVisible && (
        <Modal
          open={previewVisible}
          onCancel={handlePreviewClose}
          footer={null}
          width="80%"
          zIndex={999999}
          centered
          bodyStyle={{ padding: 0 }}>
          <div className="relative  w-full h-[80vh]">
            <iframe
              srcDoc={value}
              title="HTML Preview"
              className="w-full h-full"
            />
          </div>
        </Modal>
      )}
    </>
  )
}
