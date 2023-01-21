import {
  RichTextEditorComponent,
  Toolbar,
  Inject,
  Image,
  Link,
  HtmlEditor,
  Count,
  QuickToolbar,
  Table,
} from "@syncfusion/ej2-react-richtexteditor";
import {
  ToolbarSettingsModel,
  QuickToolbarSettingsModel,
} from "@syncfusion/ej2-react-richtexteditor";
import { createElement } from "@syncfusion/ej2-base";

const TestEditor = () => {
  const items: string[] = [
    "Bold",
    "Italic",
    "Underline",
    "StrikeThrough",
    "FontName",
    "FontSize",
    "FontColor",
    "BackgroundColor",
    "LowerCase",
    "UpperCase",
    "|",
    "Formats",
    "Alignments",
    "NumberFormatList",
    "BulletFormatList",
    "Outdent",
    "Indent",
    "SuperScript",
    "SubScript",
    "|",
    "CreateTable",
    "CreateLink",
    "Image",
    "FileManager",
    "|",
    "ClearFormat",
    "Print",
    "SourceCode",
    "FullScreen",
    "|",
    "Undo",
    "Redo",
  ];

  const quickToolbarSettings: QuickToolbarSettingsModel = {
    table: [
      "TableHeader",
      "TableRows",
      "TableColumns",
      "TableCell",
      "-",
      "BackgroundColor",
      "TableRemove",
      "TableCellVerticalAlign",
      "Styles",
    ],
  };
  //Rich Text Editor ToolbarSettings
  const toolbarSettings: ToolbarSettingsModel = {
    items: items,
  };

  return (
    <div className="control-pane">
      <div className="control-section" id="rteTools">
        <div className="rte-control-section">
          <RichTextEditorComponent
            id="toolsRTE"
            showCharCount={true}
            toolbarSettings={toolbarSettings}
            quickToolbarSettings={quickToolbarSettings}
          >
            <div>
              <p>
                The Rich Text Editor is a WYSIWYG what you see is what you get
                editor useful to create and edit content, and return the valid{" "}
                HTML markup or of the content
              </p>{" "}
              <p>
                <b>Toolbar</b>
              </p>
              <ol>
                <li>
                  {" "}
                  <p>
                    The Toolbar contains commands to align the text, insert a
                    link, insert an image, insert list, undo/redo operations,
                    HTML view, etc{" "}
                  </p>
                </li>
                <li>
                  <p>The Toolbar is fully customizable </p>
                </li>
              </ol>{" "}
              <p>
                <b>Links</b>
              </p>
              <ol>
                <li>
                  <p>
                    You can insert a hyperlink with its corresponding dialog{" "}
                  </p>
                </li>
                <li>
                  <p>Attach a hyperlink to the displayed text. </p>
                </li>
                <li>
                  <p>Customize the quick toolbar based on the hyperlink </p>{" "}
                </li>
              </ol>
              <p>
                <b>Image.</b>
              </p>
              <ol>
                <li>
                  <p>
                    Allows you to insert images from an online source as well as
                    the local computer{" "}
                  </p>{" "}
                </li>
                <li>
                  <p>You can upload an image</p>
                </li>
                <li>
                  <p>
                    Provides an option to customize the quick toolbar for an
                    image{" "}
                  </p>
                </li>
              </ol>
            </div>
            <Inject
              services={[
                Toolbar,
                Image,
                Link,
                HtmlEditor,
                Count,
                QuickToolbar,
                Table,
              ]}
            />
          </RichTextEditorComponent>
        </div>
      </div>
    </div>
  );
};

export default TestEditor;
