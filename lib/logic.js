/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Issue a CMR document
 * @param {org.blockowisko.hypercmrsystem.IssueDocument} issueDocument
 * @transaction
 */
async function issueDocument(tx) {
    const documentID = tx.documentID;
    const eCMRID = tx.eCMRID;
    const boxCount = tx.boxCount;
    const from = tx.from;
    const to = tx.to;
    const carrier = tx.carrier;

    const status = 5;
    const statusMessage = 'Nowy';

    const factory = getFactory();
    const document = factory.newResource('org.blockowisko.hypercmrsystem', 'CMRDocument', documentID);
    document.eCMRID = eCMRID;
    document.boxCount = boxCount;
    document.from = from;
    document.to = to;
    document.carrier = carrier;

    document.status = status;
    document.statusMessage = statusMessage;

    const assetRegistry = await getAssetRegistry('org.blockowisko.hypercmrsystem.CMRDocument');
    await assetRegistry.add(document);
}
