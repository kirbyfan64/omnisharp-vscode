/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { SpawnOptions, spawn } from "child_process";
import { join, Result } from "async-child-process";
import { nodePath, rootPath } from "./projectPaths";

export default async function spawnNode(args?: string[], options?: SpawnOptions): Promise<Result> {
    if (!options) {
        options = {
            env: {}
        };
    }
    
    let optionsWithFullEnvironment = {
        cwd: rootPath,
        ...options,
        env: {
            ...process.env,
            ...options.env
        }
    };
    
    console.log(`starting ${nodePath} ${args.join(' ')}`);

    let spawned = spawn(nodePath, args, optionsWithFullEnvironment);
    
    spawned.stderr.pipe(process.stdout);
    spawned.stdout.pipe(process.stdout);

    return join(spawned);
}