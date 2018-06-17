/*
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
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

/**
 * Setup demo data
 * @param {org.blockowisko.hypercmrsystem.SetupDemoData} setupDemoData
 * @transaction
 */
async function setupDemoData(tx) {
    let data = [
        {'from': 'Cukrownia Bełdany', 'to': 'Auchan Montpelier', 'carrier': 'TransEx', 'status': 10, 'statusMessage': 'Nowy', 'boxCount': 1},
        {'from': 'Cukrownia Bełdany', 'to': 'Społem Bielany', 'carrier': 'TransEx', 'status': 20, 'statusMessage': 'W drodze', 'boxCount': 4},
        {'from': 'IPM Logistics Stryków', 'to': 'IKEA Kraków', 'carrier': 'TransEx', 'status': 70, 'statusMessage': 'W drodze', 'boxCount': 4},
        {'from': 'Express Couriers W23', 'to': 'Express Couriers L01', 'carrier': 'TransEx', 'status': 100, 'statusMessage': 'Doręczony', 'boxCount': 1},
        {'from': 'Express Couriers W23', 'to': 'Express Couriers O02', 'carrier': 'TransEx', 'status': 100, 'statusMessage': 'Doręczony', 'boxCount': 1}
    ];

    const factory = getFactory();
    const assetRegistry = await getAssetRegistry('org.blockowisko.hypercmrsystem.CMRDocument');

    var ID = 0;
    for (let e in data) {
        let entry = data[e];
        const document = factory.newResource('org.blockowisko.hypercmrsystem', 'CMRDocument', ''+ID);
        document.eCMRID = ''+ID;
        document.boxCount = entry.boxCount;
        document.from = entry.from;
        document.to = entry.to;
        document.carrier = entry.carrier;
        document.status = entry.status;
        document.statusMessage = entry.statusMessage;
        await assetRegistry.add(document);
        ID++;
    }
}
