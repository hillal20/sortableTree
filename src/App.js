import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';


const App = () => {


    const [file, setFile] = useState(null)
    const [treeData, setTreeData] = useState([]);

    const onDrop = useCallback(acceptedFiles => {

        const reader = new FileReader()
        acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            // Do whatever you want with the file contents
            let text = String.fromCharCode.apply(null, new Uint8Array(reader.result));
            setFile(text);
        }
    }, []);


    //////////////////////////////////////////////////////////////////////////////////
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    let arr = [

        {
            "title": "nothing ",
            "subtitle": "nothing ",
            "expanded": true,
            "children": []
        }
    ];
    if (file !== null) {
        arr = JSON.parse(file);
    }

 console.log('arr ===> ', arr )
    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            <div style={{border: "2px solid black", height: 400, margin: 20}}>
                <SortableTree
                    treeData={arr}
                    onChange={newTreeData => {
                        console.log("newTreeData ==> ", newTreeData)
                        try {
                            setTreeData([{newTreeData}])
                        } catch (err) {
                            console.error("err  =>", err)
                        }
                    }
                    }

                />
            </div>
        </div>
    )
}

export default App;
