/* eslint-disable max-len */

"use strict";

const backButtonWithTitle = require("../common/backButtonWithTitle");
const header = require("../common/header");

const html = `
<div class="terms-and-conditions flex-column">
  ${header(backButtonWithTitle("Accept Terms & Conditions"))}
  <div class="text">
    <h1>BLADE <br />(by ADBANK)</h1>
    <div class="underheader">
      <h2>GENERAL TERMS AND CONDITIONS</h2> <p>for users acquiring the use of BLADE</p>
    </div>
    <h3>January 2019</h3>
    <p>
    READ THESE TERMS AND CONDITIONS (“Terms”) CAREFULLY BEFORE USING THE SERVICES DESCRIBED HEREIN. BY DOWNLOADING THE EXTENSION LOCATED AT
    [add website url] (“Website”) AND PRODUCTS OFFERED THEREIN, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND CONDITIONS AND THAT YOU AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO ALL OF THE
    TERMS AND CONDITIONS OF THIS AGREEMENT, YOU ARE NOT AN AUTHORIZED USER OF THESE SERVICES AND YOU SHOULD NOT USE BLADE NOR ITS PRODUCTS. BY USING BLADE YOU ACKNOWELDGE AND AGREE TO BE BOUND BY THESE TERMS AND ANY TERMS INCORPORATED BY REFERENCE. YOU MAY BE REFERRED TO YOU, ANY ENTITY THAT YOU REPRESENT, OR ANY AGENT
    OR AFFILIATE THEREOF.

    BLADE RESERVES THE RIGHT TO CHANGE, MODIFY, ADD OR REMOVE PORTIONS OF THESE TERMS AT ANY TIME FOR ANY REASON. ALL USERS SHOULD REVIEW THESE TERMS PERIODICALLY FOR CHANGES. SUCH CHANGES SHALL BE EFFECTIVE IMMEDIATELY UPON POSTING. YOU ACKNOWLEDGE THAT BY DOWNLOADING AND USING OUR EXTENSION AFTER WE HAVE POSTED CHANGES TO THESE TERMS, YOU ARE AGREEING TO ANY AND ALL MODIFICATIONS.

    THIS DOCUMENT DOES NOT CONSTITUTE INVESTMENT ADVICE OR COUNSEL. NOTHING IN THIS DOCUMENT OR ANY OTHER ASSOCIATED DOCUMENT ON THE WEBSITE CONSTITUES A SOLICITATION FOR INVESTMENT OR OFFERING IN ANY SECURITY OR COLLECTIVE INVESTMENT SCHEME AND SHALL NOT BE CONSTRUED IN THAT WAY.

    THIS DOCUMENT DOES NOT CONSTITUTE OR FORM PART OF, AND SHOULD NOT BE CONSTRUED AS, ANY OFFER FOR SALE OR SUBSCRIPTION OF, OR ANY INVITATION TO OFFER TO BUY OR SUBSCRIBE TO, ANY SECURITIES OR COLLECTIVE INVESTMENT SCHEME IN ANY FORM WHATSOEVER. ACQUISITION OF CRYPTOGRAPHIC TOKENS FROM THE USE OF BLADE DOES NOT PRESENT AN EXCHANGE OF CRYPTOCURRENCIES FOR ANY FORM OF ORDINARY ADB TOKENS IN BLADE OR ADBANK, AND HOLDER OF ANY CRYPTOGRAPHIC TOKENS, ISSUED THROUGH THE USE OF BLADE IS NOT ENTITLED TO ANY GUARANTEED FORM OF DIVIDEND OR OTHER REVENUE RIGHT. HOLDERS OF ADB CRYPTOGRAPHIC TOKENS ARE ONLY ENTITLED TO THE USE OF THE BLADE EXTENSION AND SOFTWARE AND CERTAIN OTHER RIGHTS WITHIN THE EXTENSION IN ACCORDANCE WITH THE TERMS SET OUT HEREIN.

    BLADE DOES NOT IN ANYWAY PROVIDE EXCHANGE OF SHARE CRYPTOGRAPHIC TOKENS FOR FIAT CURRENCY.

    ANY PERSON OR ENTITY, INCLUDING ANYONE ACTING ON ITS BEHALF, BEING BASED, DOMICILED, LOCATED OR INCORPORATED IN THE UNITED STATES OF AMERICA AND ANY OF ITS LANDS, CANADA, CHINA, THE REPUBLIC OF KOREA OR IN THE REPUBLIC OF SEYCHELLES, SHALL BE RESTRICTED FROM DOWNLOADING AND USING BLADE. Note: double-check which countries we need to restrict

    BLADE EXPRESSLY DISCLAIMS ANY AND ALL RESPONSIBILITY FOR ANY DIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL LOSS OR DAMAGE OF ANY KIND WHATSOEVER ARISING DIRECTLY OR INDIRECTLY FROM: (I) RELIANCE ON ANY INFORMATION CONTAINED IN THIS DOCUMENT, (II) ANY ERROR, OMISSION OR INACCURACY IN ANY SUCH INFORMATION OR (III) ANY ACTION RESULTING THEREFROM, (IV) USAGE OR ACQUISITION OF PRODUCTS, AVAILABLE THROUGH THE EXTENSION.

    BY USING THE EXTENSION, YOU ACKNOWLEDGE AND AGREE THAT, TO THE EXTENT PERMITTED BY LAW, YOU WILL HOLD BLADE AND ADBANK AND ANY PAST, PRESENT AND FUTURE EMPLOYEES, OFFICERS, DIRECTORS, CONTRACTORS, CONSULTANTS, AGENTS, AND REPRESENTATIVES THEREOF HARMLESS FOR ANY SUCH LOSS OR DAMAGES.
    </p>
    <h3>The Extension</h3>
    <p>The aim of Blade is to develop and deploy a downloadable extension as a Service and software (“Extension”).

    Blade Extension’s integral element shall be the Adbank Token (“ADB”) and its purpose is:
    <br />
    (a) distribution of ADB tokens in accordance with the terms set out herein,
    <br />
    (b) ADB act as utility tokens facilitating open participation and coordination on the Extension,
    <br />
    (c) ADB tokens can be used to use the Extension,
    <br />
    The Project does not encompass and Blade is not a provider of:
    <br />
    (a) exchange services between virtual currencies and fiat currencies,
    <br />
    (b) wallet or custodial services of credentials necessary to access virtual currencies.</p>
    <h3>Acceptance of Terms</h3>
    <p>The Service is offered subject to acceptance without modification of all of these Terms of Use and all other operating rules, policies and procedures that may be published from time to time in connection with the Services offered by Blade. In addition, some services offered through the Blade extension may be subject to additional terms and conditions promulgated by Blade from time to time. Your use of such Services is subject to those additional terms and conditions, which are incorporated into these Terms of Use by this reference.

    Blade may, in its sole discretion, refuse to offer the Service to any person or entity and change its eligibility criteria at any time. This provision is void where prohibited by law and the right to access the Service is revoked in such jurisdictions.</p>
    <h3>ADB Structure and Pertaining Holders’ Rights</h3>
    <p>ADB is an ERC-20 standard Ethereum token.

    ADB tokens do not entitle the holder to any influence in the development or governance of Adbank or Blade whatsoever.

    ADB tokens do not represent or constitute any ownership right or stake, share or security or equivalent rights or any right to receive future revenue shares, or any other form of participation in or relating to Adbank or Blade.

    ADB tokens do not entitle Users to any return on investment.

    ADB tokens do not entitle Users to any profit or passive income from ownership of the tokens.</p>
    <h3>Modification of Terms of Use</h3>
    <p>Blade reserves the right, at its sole discretion, to modify and/or replace any of the Terms of Use, or change, suspend, or discontinue the Service (including and without limitation, the availability of any feature, database, or content) at any time, by posting a notice on the Blade or Adbank website or by sending you an email. Blade may also impose limits on certain features and services or restrict you access to parts or all of the Service without notice or liability. It is your responsibility to check the Terms of Use periodically for changes. Your continued use of the Service following the posting of any changes to the Terms of Use constitutes acceptance of those changes.

    For information regarding Blade’s treatment of personally identifiable information, please review our Privacy Policies at [website url]. Note: We should create a privacy policy around KYC gathering info. </p>
    <h3>Blade Extension Licence</h3>
    <p>Subject to the terms hereof, Blade grants you personal, non-exclusive license to install and use the Blade extension. Blade and its licensors shall retain all intellectual property rights in the Blade browser (and Service), except for the rights expressly granted in this Agreement. You may not remove or alter any trademark, or logo (collectively, “Marks”), copyright or other proprietary notice on the Blade browser. This license does not grant you any right to use Marks of Blade or its licensors. If you breach this Agreement, the above license and your right to use the Blade browser will terminate immediately and without notice. </p>
    <h3>Rules and Conduct</h3>
    <p>As a condition of use, you promise not to use the Service for any purpose that is prohibited by the Terms of Use. For purposes of the Terms of Use, the term “Content” includes, without limitation, any information, data, text, photographs, videos, software, scripts, graphics, and interactive features generated, provided, or otherwise made accessible on or through the Service. By way of example, and not as a limitation, you shall not (and shall not permit any third party to) take any action (including contributing any Content) that: would constitute  a violation of any applicable law, rule or regulation infringes any intellectual property or other right of any other person or entity; is threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive or another’s privacy, tortious, obscene, offensive, or profane; constitutes unauthorized or unsolicited advertising, junk or bulk email; contains software viruses or any other similar computer codes, files, or programs; or impersonates any person or entity.

    Further, you shall not (directly or indirectly): (i) take any action that imposes or may impose an unreasonable or disproportionately large load on Blade’s (or its third party providers’) infrastructure; or (ii) interfere or attempt to interfere with the proper working of the Service or any activities conducted on the Service; (iii) bypass any measures Blade may use to prevent or restrict access to the Service (or parts thereof).</p>
    <h3>Trademarks & Patents</h3>
    <p>All Blade’s logos, marks and designations are trademarks or registered trademarks of Blade. All other trademarks mentioned in this website are the property of their respective owners. The trademarks and logos displayed on this website may not be used without the prior written consent of Blade or their respective owners (including Adbank).</p>
    <h3>Termination</h3>
    <p>Blade may terminate your access to all or any part of the Service at any time if you fail to comply with these Terms of Use, which may result in the forfeiture and destruction of all information associated with your account. Further, either party may terminate the Services for any reason and at any time upon written notice. If you wish to terminate your account, you may do so by following the instructions on the Service. Upon any termination, all rights and licenses granted to you in this Agreement shall immediately terminate, but all provisions hereof which by their nature should survive termination shall survive termination, including, without limitation, warranty disclaimers, indemnity and limitations of liability.</p>
    <h3>Indemnification</h3>
    <p>You shall defend, indemnify, and hold harmless Blade, its affiliates and each of its, and its affiliates employees, contractors, directors, suppliers and representatives from all liabilities, losses, claims, and expenses, including reasonable attorneys’ fees, that arise from or relate to (i) your use or misuse of, or access to, the Service, or (ii) your violation of the Terms of Use or any applicable law, contract, policy, regulation or other obligation. Blade reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with Blade in connection therewith.</p>
    <h3>Risks</h3>
    <p>You understand that Digital Assets, ADB, blockchain technology, Ethereum, Ether and other associated and related technologies are new, untested and outside of Blade’s exclusive control. Adverse changes in market forces or the technology,
    broadly construed, will excuse Blade’s performance under this agreement.

    In addition to the above, You also acknowledge that You have been warned of the following risks, associated with the Extension, the ADB tokens and other relevant technologies mentioned herein.
    <br />
    (a) Legal risks regarding securities regulations. There is a risk that in some jurisdictions the ADB tokens and other Digital Assets may be deemed a security by relevant regulatory bodies, Blade does not give warranties or guarantees that ADB tokens will not be deemed security in all jurisdictions. Each user of ADB tokens shall bear its own legal or financial consequences of ADB tokens being considered a security in their respective jurisdiction, and shall bear the sole costs of any damages resulting from that or any other risk associated regulatory enforcement action. It is the sole and exclusive responsibility of the User to determine whether acquisition and disposal of ADB tokens is legal in any given jurisdiction. By accepting these Terms, the User hereby agrees that User shall not use, store, exchange, or in any other way treat ADB tokens in a manner which violates the laws and regulations of a relevant jurisdiction.
    <br />
    If a user determines that the use of ADB under these Terms is not legal in a relevant jurisdiction, USER should discontinue use of the ADB tokens until such time as use of the ADB tokens no longer constitutes a violation. USER acknowledges and agrees that cryptographic token possession and exchange is currently under scrutiny by
    regulatory bodies around the world. The legal ability of Blade to provide ADB tokens and the Extension in some jurisdictions may be eliminated by future regulation or legal actions. Blade is not responsible for, and USER shall bear any and all cost resulting from, any such regulatory action.
    <br />
    (b) Risks associated with Ethereum ADB tokens are based on Ethereum blockchain. As such, any malfunction, unintended function or unexpected functioning of the Ethereum protocol may cause the ADB tokens to malfunction or function in an unexpected or unintended manner. Ether, the native unit of account of the Ethereum, may itself lose value, which in turn may effect the value of ADB tokens More information about the Ethereum is available at http://www.ethereum.org.
    <br />
    (c) Risk of unfavourable regulatory action in one or more jurisdictions. Blockchain technologies have been the subject of scrutiny by various regulatory bodies around
    the world. The functioning of the Ethereum network and associated blockchain networks and Digital Assets and ADB tokens could be impacted by one or more
    regulatory inquiries or actions, including but not limited to restrictions on the use or possession of digital tokens like ADB tokens, which could impede or limit their
    existence, permissibility of their use and possession, and their value.
    <br />
    (d) Risk of theft and hacking. Hackers or other groups or organizations may attempt to interfere with Your Third-party Wallet, the Website or the availability of ADB tokens and Digital Assets in any number of ways, including without limitation denial of service attacks, Sybil attacks, spoofing, smurfing, malware attacks, or consensus-based attacks.
    <br />
    (e) Risk of weaknesses or exploitable breakthroughs in the field of cryptography. Advances in cryptography, or technical advances such as the development of quantum computers, could present risks to cryptocurrencies, Ethereum, ADB tokens, the Platform, which could result in the theft or loss of ADB
    tokens.
    <br />
    (f) Risk of mining attacks. As with other decentralized cryptocurrencies, Ethereum blockchain, which is used for the ADB tokens, is susceptible to mining attacks, including but not limited to double-spend attacks, majority mining power attacks, “selfish-mining” attacks, and race condition attacks. Any successful attacks present a risk to the ADB tokens, expected proper execution and sequencing of ADB tokens, and expected proper execution and sequencing of Ethereum contract computations in general. Despite the efforts of Blade and Ethereum Foundation, the risk of known or novel mining attacks exists. Mining Attacks, as described above, may also target other blockchain networks, with which the ADB tokens interact with and consequently the ADB tokens may be impacted also in that way to the extent, described above.
    <br />
    (g) Risk of malfunction in the Ethereum network or any other blockchain. It is possible that the Ethereum network or any other network, to which the ADB tokens are interacting with, malfunctions in an unfavourable way, including but not
    limited to one that results in the loss of ADB tokens.
    <br />
    (h) Unanticipated risks. Cryptocurrencies and blockchains are new and untested technology. In addition to the risks set forth here, there are risks that Blade cannot foresee and it is unreasonable to believe that such risks could have been foreseeable. Risks may further materialize as unanticipated.</p>
    <h3>Eligibility</h3>
    <p>The Blade Extension and ADB tokens are not offered for use to natural and legal persons, having their habitual residence or their seat of incorporation in the following countries: the United States of America and any of its lands,
    Canada, China, The Republic of Korea, The Repblic of Seychelles or countries listed on OFAC sanctions lists (“Restricted Areas”).

    Natural and legal persons with their habitual residence or seat of incorporation from the Restricted Areas shall not use the Website, the Extension and ADB tokens.

    If You are registering to use the Extension on behalf of a legal entity, You represent and warrant that
    <br />
    (a) such legal entity is duly organized and validly existing under the applicable laws of the jurisdiction of its organization; and
    <br />
    (b) You are duly authorized by such legal entity to act on its behalf.
    <br />
    You further represent and warrant that You:
    <br />
    (a) are of legal age to form a binding contract (at least 18 years old in most of the jurisdictions);
    <br />
    (b) have full power and authority to enter into this agreement and in doing so will not violate any other agreement to which You are a party;
    <br />
    (c) are not located in, under the control of, or a national or resident of any Restricted Areas;
    <br />
    (d) have not been placed on any sanctions lists published and maintained by the United Nations, European Union, any EU country, UK Treasury and US Office of Foreign Assets Control (OFAC);
    <br />
    (e) will not use the ADB tokens if any applicable laws in jurisdiction of your habitual residence or incorporations prohibit you from doing so in accordance with these Terms;
    <br />
    (f) have a substantial understanding of and experience with the functionality, usage, storage of cryptographic tokens, smart contracts, and blockchain-based software;
    <br />
    (g) have carefully reviewed the content of this document and have understood and agreed with these Terms.
    </p>
    <h3>Financial Regulations and Cooperation with Legal Authorities and Authorized Financial Institutions and Regulators </h3>
    <p>Blade is closely following changes to legislation in relevant jurisdictions and shall take reasonable steps to maintain regulatory compliance if any legal or regulatory changes impact operations of ADB tokens or the Extension. Blade is not a financial institution. Blade does not provide any licensed financial services, such as investment services, capital raising, fund management or investment advice.

    These Terms or any associated document produced by Blade, including the Extension and any content therein, do not constitute an offer or solicitation to sell ADBs or securities.

    None of the information or analyses presented are intended to form the basis for any investment decision, nothing contained in any Blade document or communication constitutes a specific investment recommendations, and Blade services and the Extension are not, do not offer and shall not be construed as
    investment or financial products.

    Blade undertakes to cooperate with any governmental legal authority or regulator or supervisory authority of any country, and also with all authorized financial institutions.</p>
    <h3>Liability</h3>
    <p>Blade, its affiliates and their respective officers, employees or agents shall not be liable to you for losses or damages of any kind resulting from your use of the Extension or any Blade product. User acknowledges and agrees that, to the fullest extent permitted by any applicable law, the disclaimers of liability contained herein apply to any and all damages or injury whatsoever caused by or related to use of, or inability to use, ADB tokens or the Extension and that Blade, its affiliates and their respective officers, employees or agents,  shall not be liable under any cause of action whatsoever of any kind in any jurisdiction, including, without limitation, actions for breach of warranty, breach of contract or tort (including negligence), or any indirect, incidental, special, exemplary or consequential damages, including for loss of profit, goodwill or data, in any way whatsoever arising out of the use of, or inability to use, ADB tokens or the Extension. User further specifically acknowledges that neither Blade nor Adbank is not liable for the conduct of third parties, including other users, and that the risk of use rests entirely with you.

    Further, neither Blade, Adbank nor any of its affiliates nor their respective officers, employees or agents will be responsible for any compensation, reimbursement, or damages arising in connection with: (a) Your inability to use the Extension or ADB tokens, including without limitation as a result of any termination or suspension of the Ethereum network or this Agreement, including as a result of power outages, maintenance, defects, system failures or other interruptions; (b) the cost of procurement of substitute goods or services; (c) any investments, expenditures, or commitments by you in connection with this agreement or your use of or access to the to the Extension and ADB tokens; or (d) any unauthorized access to, alteration of, or the deletion, destruction, damage, loss or failure to store any data, including records, private key or other credentials, associated with to the Extension and ADB tokens.

    You will defend, indemnify, and hold harmless Blade, Adbank, its affiliates and licensors, and each of their respective employees, officers, directors, and representatives from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising out of or relating to
    any third-party claim concerning this Agreement or your use of the Extension and ADB tokens contrary to these Terms. If Blade or any affiliates are obligated to respond to a third-party subpoena or other compulsory legal order or process described above, you will also reimburse Blade for reasonable attorney fees, as well as Blade’s employees’ and contractors’ time and materials spent responding to the third-party subpoena or other compulsory legal order or process at reasonable hourly rates.

    The information, software, products, and services included in or available through the Extension may include inaccuracies or typographical errors. Changes are periodically added to the information herein. Blade and/or its suppliers may make improvements and/or changes to the Extension at any time. Blade makes no representations about the suitability, reliability, availability, timeliness, and accuracy of the to the Extension, ADB tokens, information, software, products, services and related graphics contained in the Extension for any purpose. To the maximum extent permitted by applicable law, the Extension and ADB tokens, all such information, software, products, services and related graphics are provided "as is" without warranty or condition of any kind. Blade hereby disclaims all warranties and conditions with regard to the Extension, ADB tokens, information, software, products, services and related graphics, including all implied warranties or conditions of merchantability, fitness for a particular purpose, title and non-infringement.

    You warrant to Blade that you will not use the Extension or the ADB tokens for any purpose that is unlawful or prohibited by these Terms. You may not use the Extension or ADB tokens in any manner that could damage, disable, overburden, or impair the Extension, ADB tokens or the Adbank platform.</p>
    <h3>Security</h3>
    <p>You will implement reasonable and appropriate measures designed to secure access to (i) any device associated with the email address associated with your account with the Extension, (ii) private keys required to access any relevant Ethereum address, and (iii) your username, password and any other login or identifying credentials of the Extension.

    In the event that you are no longer in possession of any device associated with your account or are not able to provide your login or identifying credentials to the Platform, we may, in our sole discretion, and only if we are able, grant access to your
    account to any party providing additional credentials to us. We explicitly reserve the right to determine the additional credentials required, which may include, without limitation, a sworn, notarized statement of identity.</p>
    <h3>Privacy</h3>
    <p>As a principle, Blade may collect only what we need and will not share your personal information with any third parties other than our identity verification partner, if it applies. Even within Blade, access to your personal information is limited to a subset of employees who work on compliance and identity verification matters. Blade is the only data controller and processor.

    You will provide to us, immediately upon our notice of request, information that we, in our sole discretion, deem to be required to maintain compliance with any law, regulation or policy. Such documents include, but are not limited to, passports, driver’s licenses, utility bills, photographs of you, government identification cards, or sworn statements.

    Blade reserves its right to request documentation, described in the above paragraph, prior to activating your account at any of Blade and the Extension services, and any services, available through the Extension. Blade may refuse you access to the Extension should it have doubts as to validity, authenticity and genuineness of the documents, provided by you.

    If you create an account at the Extension we may collect and store the following types of information: Contact information – Your name, address, phone, email and other similar information

    We store and process your personal information on our servers, where our facilities or our service providers are located. We protect your information using physical, technical, and administrative security measures to reduce the risks of loss, misuse, unauthorized access, disclosure, and alteration. Some of the safeguards we use are firewalls and data encryption, physical access controls to our data centers, and information access authorization controls. We also authorize access to personal information only for those employees who require it to fulfill their job responsibilities. All of our physical, electronic, and procedural safeguards are designed to comply with applicable laws and regulations. Data may from time to time be stored also in other locations.</p>
    <h3>Miscellaneous</h3>
    <p>
    The Terms of Use are the entire agreement between you and Blade with respect to the Service, and supersede all prior or contemporaneous communications and proposals (whether oral, written or electronic) between you and Blade with respect to the Service. If any provision of the Terms of Use is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms of Use will otherwise remain in full force and effect and enforceable. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder. Blade shall not be liable for any failure to perform its obligations hereunder due to any cause beyond Blade’s reasonable control. The Terms of Use are personal to you, and are not assignable or transferable by you except with Blade’s prior written consent. Blade may assign, transfer or delegate any of its rights and obligations hereunder without consent. No agency, partnership, joint venture, or employment relationship is created as a result of the Terms of Use and neither party has any authority of any kind to bind the other in any respect. Except as otherwise provided herein, all notices under the Terms of Use will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or two days after it is sent, if sent for next day delivery by recognized overnight delivery service.</p>
    <div class="form-wrap">
      <label>I Accept the Terms & Conditions
        <input type="checkbox" id="checkbox1">
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
  <button class="main-action-button" id="action-btn" disabled="true">ACCEPT</button>
</div>
`
;

module.exports = html;
