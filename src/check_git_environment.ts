import * as fspath from 'path';
import { exec } from 'child_process';
import * as vscode from 'vscode';

export function isWorkspaceGitDirectory(path: string) : boolean {

    return false;
}

export function isGitInstalled(path?: string | undefined) : boolean {
    let gitPath: string = "git";
    if(path !== undefined) {
        gitPath = fspath.join(path, gitPath);
    }

    let gitFound : boolean = true;
    exec(`${gitPath} --version`, (error, stdout, stderr) => {
        if(error) {
            vscode.window.showErrorMessage(`Git could not be located. Another-Git-Extension will not work until it is installed.`);
            console.error(`error: ${error.message}`);
            gitFound = false;
        }
        if(stderr) {
            vscode.window.showErrorMessage(`Git could not be located. Another-Git-Extension will not work until it is installed.`);
            console.error(`stderr: ${stderr}`);
            gitFound = false;
        }
        if(stdout) {
            vscode.window.showInformationMessage(`Git was found :)`);
            console.error(`stdout: ${stdout}`);
            gitFound = true;
        }
    });

    return gitFound;
}