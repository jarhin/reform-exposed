"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Constituency from "./Constituency";
import { Tweet } from "@/types";

interface SearchProps {
  setTweets: (tweets: Tweet[]) => void;
}

const tweets = [
    {
        "tweet_id": 1840388743191986412,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1840388743191986412",
        "tweet_content": "Lee Anderson:\nNottingham Forest v Man U: £630 x1 ticket\nForest v Liverpool: £630 x1 ticket\nEngland vs All Blacks: £1,950\n\nhttps://t.co/EF3Bte0JFi",
        "created_at": "2024-09-29 13:50:43"
    },
    {
        "tweet_id": 1842441989159047329,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1842441989159047329",
        "tweet_content": "Brian Evans is setting up the Shropshire Reform UK Branch. He’s also standing in the next Council Elections. They are in May 2025.\n\nProblem is, Brian’s home is in Brittany and he’s only staying here for 12 months.\n\nThat means you’d only get him as a councillor for 5 months. https://t.co/WOELRCWbwg",
        "created_at": "2024-10-05 05:49:35"
    },
    {
        "tweet_id": 1891088022629695971,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1891088022629695971",
        "tweet_content": "Introducing Nat Vanstone, the Reform UK candidate for Exe Valley, East %Devon.\n\nWould you trust someone who contacts the ‘Free Fuck Finder’ (an account banned in several countries)?\n\nIf you’re looking for a man of integrity as your councillor, he ain’t your guy as he was well into his current relationship when he posted this call out to ‘Free Fuck Finder’ in Devon for girls in the area.\n\nThe post is still live, among the usual Reform RTs: https://t.co/cKM6Ajq4uY",
        "created_at": "2025-02-16 11:31:33"
    },
    {
        "tweet_id": 1899454189807218814,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1899454189807218814",
        "tweet_content": "John Pinnington is the Reform UK candidate in the Sutton South East, St. Helens council by-election on 3rd April 2025.\n\n@DaveLeigh8402 as Deputy Branch Chair of St Helens @ReformParty_UK, we thought you may like to know about his online activity. https://t.co/fup9UK1HPU",
        "created_at": "2025-03-11 13:35:43"
    },
    {
        "tweet_id": 1900091550463308045,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1900091550463308045",
        "tweet_content": "@dano1311 Imagine if Scunthorpe was constantly forgotten by people claiming to know what they are talking about.",
        "created_at": "2025-03-13 07:48:22"
    },
    {
        "tweet_id": 1901898233544118748,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1901898233544118748",
        "tweet_content": "If you were the Reform UK Greater Lincolnshire Mayoral candidate, you’d probably not want to wake up to photos of yourself being all cosy with the Reform candidate that got convicted of defrauding a charity yesterday.\n\nYet here @andreajenkyns is… https://t.co/M3CuKaDaGU",
        "created_at": "2025-03-18 07:27:29"
    },
    {
        "tweet_id": 1902616180784779718,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1902616180784779718",
        "tweet_content": "Nigel Farage, dereliction of duty\n\nThis morning sees the important meeting of Clacton Town Board at 10.00 am.\n\nThis is one that the MP should attend and always did (see Attendance ‘expected’): https://t.co/uwq6zDMrvv\n\nBut guess where Clacton’s MP is? Florida, USA. https://t.co/fjZQoNsMk9",
        "created_at": "2025-03-20 07:00:21"
    },
    {
        "tweet_id": 1903022553888604225,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1903022553888604225",
        "tweet_content": "Reform UK candidate in Cornwall Ollie Williams was on Love Island, people called on him to be booted off the show when it emerged he is a fan of trophy hunting.\n\nWonder how that will go down with Reform UK’s passionate animal rights campaigners.\n\nOllie is running for the ‘anti-establishment’ party, despite being set to inherit the 2,000-acre estate and become a Viscount.",
        "created_at": "2025-03-21 09:55:07"
    },
    {
        "tweet_id": 1903355633039999143,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1903355633039999143",
        "tweet_content": "Peter Osborne, Reform UK local election candidate for Hythe West (@ReformUKFHRM). We’ve got a mixture of racism and misogyny from this one. Seriously, where is your vetting @reformparty_uk? https://t.co/nMImb1ESDN",
        "created_at": "2025-03-22 07:58:40"
    },
    {
        "tweet_id": 1903355633039999143,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1903355633039999143",
        "tweet_content": "Peter Osborne, Reform UK local election candidate for Hythe West (@ReformUKFHRM). We’ve got a mixture of racism and misogyny from this one. Seriously, where is your vetting @reformparty_uk? https://t.co/nMImb1ESDN",
        "created_at": "2025-03-22 07:58:40"
    },
    {
        "tweet_id": 1904120923109638513,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1904120923109638513",
        "tweet_content": "Reform UK's candidate Cameron Richards (@CamRichards2004) is standing in the council by-election for Cwmllynfell and Ystalyfera, Neath Port Talbot 3rd April.\n\nWould be great to see his current thinking on zero-hour contracts given Reform UK support them, and opposed the Employment Rights Bill reforms on them.\n\nNot sure if he'll reply as he's locked his Twitter down.",
        "created_at": "2025-03-24 10:39:39"
    },
    {
        "tweet_id": 1904181449583968680,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1904181449583968680",
        "tweet_content": "Cheshire West and Chester Reform UK councillor Mandy Clare slammed for homophobic Facebook comments:\n\nhttps://t.co/rWLmMxacUB\n\nShe's one of the recent announced defectors to Reform. She even has TERF in her handle... @MandyClareTERF \n\nHere's her previous track record:\n\n2019: Labour Party\n2022: Socialist Labour Party\n2023: Workers Party of Britain\n2024: Party of Women\n2024: Winsford Salt of the Earth Grouping\n2024: Independent\n2025: Reform UK\n\nWhat does Mandy Clare stand for?",
        "created_at": "2025-03-24 14:40:10"
    },
    {
        "tweet_id": 1904181449583968680,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1904181449583968680",
        "tweet_content": "Cheshire West and Chester Reform UK councillor Mandy Clare slammed for homophobic Facebook comments:\n\nhttps://t.co/rWLmMxacUB\n\nShe's one of the recent announced defectors to Reform. She even has TERF in her handle... @MandyClareTERF \n\nHere's her previous track record:\n\n2019: Labour Party\n2022: Socialist Labour Party\n2023: Workers Party of Britain\n2024: Party of Women\n2024: Winsford Salt of the Earth Grouping\n2024: Independent\n2025: Reform UK\n\nWhat does Mandy Clare stand for?",
        "created_at": "2025-03-24 14:40:10"
    },
    {
        "tweet_id": 1904521163256070491,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1904521163256070491",
        "tweet_content": "Reform UK's candidate for Doncaster Mayor, Alexander Jones is being touted as a model and 'Forex trader'. He posts about a lot of profit on his Instagram: https://t.co/OEzbuIf5Ff\n\nBut his company seems to post dormant accounts each year: https://t.co/jtuIK2bi8u https://t.co/thpiFj1Q26",
        "created_at": "2025-03-25 13:10:04"
    },
    {
        "tweet_id": 1906245141028864073,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906245141028864073",
        "tweet_content": "Reform UK’s Ed Hill (@EdHill_ReformUK), Branch Chair Exeter and candidate for Topsham, Devon.\n\nMocking a Green Party activist for trying to canvass his house. Obviously doesn’t believe in privacy / GDPR. Here he has published the pic taken from his door camera just to try to make a joke.\n\nAnd you trained as a lawyer.\n\nIt’s cropped here so you can’t see the canvasser. That’s how you respect privacy, Ed.",
        "created_at": "2025-03-30 07:20:32"
    },
    {
        "tweet_id": 1906301859288993975,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906301859288993975",
        "tweet_content": "Our response to @Benonwine Interview with Peter Whittle.\n\nPlease share.\n\nHe’s basically making things up about our actions.\n\nHi @benonwine you claim on Peter Whittle @prwhittle that:\n\n1) we said @RupertLowe10 is a white supremacist. You also said he has a legal team that would deal with it.\n\nWe didn’t say that.\n\n2) you claimed we took photos from Henley Waitraise Instagram (which you ran), yes we did, but you also had many pictures on X of yourself at work (hence Ben On Wine that you started to promote them. See yourself here with Philip Schofield (as he was Waitrose Wine Ambassador).\n\nYou didn’t start the account to talk about politics, you don’t mention it until quite recently.\n\n3) You said on our post we called to a white supremacist fascist Nazi.\n\nHere’s our post, tell us where we said that:\n\nhttps://t.co/AgimjaeCIH\n\n4) you claim we posted about you photoshopped as a nazi officer. We have never done that.\n\nHere’s the video so you can see: https://t.co/eZ9z9JLce2\n\nBen himself referred to his work as a far-right influencer, not us.\n\nYou have ZERO credibility after posting this.\n\nAnd neither does Peter Whittle for publishing the video.",
        "created_at": "2025-03-30 11:05:55"
    },
    {
        "tweet_id": 1906592404934672736,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906592404934672736",
        "tweet_content": "The Reform Rally: inside out \n\nFarage’s \"biggest rally in history\" flopped - empty seats, protests, and ejections marked the night at Utilita Arena, Birmingham\n\nhttps://t.co/xXJ4XsywZ2",
        "created_at": "2025-03-31 06:20:26"
    },
    {
        "tweet_id": 1906678817432699321,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906678817432699321",
        "tweet_content": "Reform UK candidate dropped after row over immigration information in leaflets \n\nFrank Ward the Bassetlaw candidate also stood as their PPC in the General Election.\n\nhttps://t.co/FV0leLFj69",
        "created_at": "2025-03-31 12:03:49"
    },
    {
        "tweet_id": 1906732714373353750,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906732714373353750",
        "tweet_content": "Running in the Cwmllynfell and Ystalyfera, Neath Port Talbot by-election this Thursday is Cameron Richards. \n\nAnyone find out if he's still angry about zero-hour contracts or whether he's less so now he's Reform UK's candidate? @CamRichards2004",
        "created_at": "2025-03-31 15:37:59"
    },
    {
        "tweet_id": 1906759004354695368,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906759004354695368",
        "tweet_content": "Might be a good idea for Reform UK to work out what the job is before applying.\n\nThey are campaigning in Devon blaming Devon County Council for not collecting bins frequently.\n\nThey don’t collect bins, city and district councils do. https://t.co/yIq16tYFzN",
        "created_at": "2025-03-31 17:22:27"
    },
    {
        "tweet_id": 1906759004354695368,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906759004354695368",
        "tweet_content": "Might be a good idea for Reform UK to work out what the job is before applying.\n\nThey are campaigning in Devon blaming Devon County Council for not collecting bins frequently.\n\nThey don’t collect bins, city and district councils do. https://t.co/yIq16tYFzN",
        "created_at": "2025-03-31 17:22:27"
    },
    {
        "tweet_id": 1906816158885417290,
        "author_id": 845157941292380161,
        "url": "https://x.com/ElectionMapsUK/status/1906816158885417290",
        "tweet_content": "3 Council By-Elections are taking place this Thursday:\n\n- Labour Defences in Lincoln and Neath Port Talbot\n- Lib Dem Defence in St Helens https://t.co/GAj3F4fipk",
        "created_at": "2025-03-31 21:09:33"
    },
    {
        "tweet_id": 1906816158885417290,
        "author_id": 845157941292380161,
        "url": "https://x.com/ElectionMapsUK/status/1906816158885417290",
        "tweet_content": "3 Council By-Elections are taking place this Thursday:\n\n- Labour Defences in Lincoln and Neath Port Talbot\n- Lib Dem Defence in St Helens https://t.co/GAj3F4fipk",
        "created_at": "2025-03-31 21:09:33"
    },
    {
        "tweet_id": 1906995238188593179,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1906995238188593179",
        "tweet_content": "Is Arron Banks #Wanksy?\n\nImagine doing this to try to look cool. It's painful. \n\n➡️ He's given himself a nickname.\n➡️It's already taken by one of Britain's most famous artists.\n➡️He thinks Bristol will find this cool.\n\n#Wanksy https://t.co/WUdwXAStpe",
        "created_at": "2025-04-01 09:01:09"
    },
    {
        "tweet_id": 1907053975083385301,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907053975083385301",
        "tweet_content": "Reform UK: BNP Recycled in Lincolnshire\n\nHere's Alex McGonigle (@alex4louthwolds) the Reform UK candidate in Louth Wolds, Lincolnshire County Council elections in May. He's showing a supporter with his 'homemade' Reform UK sign.\n\nIt's actually recycled from a BNP posterboard.\n\nHow did this happen? Well the 'supporter' in Lincolnshire is actually former BNP  member and BNP candidate John Hattersley (he's even on the wikileaks BNP membership list).\n\nMight want to take a look at this one @reformparty_uk / @Nigel_Farage",
        "created_at": "2025-04-01 12:54:33"
    },
    {
        "tweet_id": 1907053975083385301,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907053975083385301",
        "tweet_content": "Reform UK: BNP Recycled in Lincolnshire\n\nHere's Alex McGonigle (@alex4louthwolds) the Reform UK candidate in Louth Wolds, Lincolnshire County Council elections in May. He's showing a supporter with his 'homemade' Reform UK sign.\n\nIt's actually recycled from a BNP posterboard.\n\nHow did this happen? Well the 'supporter' in Lincolnshire is actually former BNP  member and BNP candidate John Hattersley (he's even on the wikileaks BNP membership list).\n\nMight want to take a look at this one @reformparty_uk / @Nigel_Farage",
        "created_at": "2025-04-01 12:54:33"
    },
    {
        "tweet_id": 1907053975083385301,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907053975083385301",
        "tweet_content": "Reform UK: BNP Recycled in Lincolnshire\n\nHere's Alex McGonigle (@alex4louthwolds) the Reform UK candidate in Louth Wolds, Lincolnshire County Council elections in May. He's showing a supporter with his 'homemade' Reform UK sign.\n\nIt's actually recycled from a BNP posterboard.\n\nHow did this happen? Well the 'supporter' in Lincolnshire is actually former BNP  member and BNP candidate John Hattersley (he's even on the wikileaks BNP membership list).\n\nMight want to take a look at this one @reformparty_uk / @Nigel_Farage",
        "created_at": "2025-04-01 12:54:33"
    },
    {
        "tweet_id": 1907053975083385301,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907053975083385301",
        "tweet_content": "Reform UK: BNP Recycled in Lincolnshire\n\nHere's Alex McGonigle (@alex4louthwolds) the Reform UK candidate in Louth Wolds, Lincolnshire County Council elections in May. He's showing a supporter with his 'homemade' Reform UK sign.\n\nIt's actually recycled from a BNP posterboard.\n\nHow did this happen? Well the 'supporter' in Lincolnshire is actually former BNP  member and BNP candidate John Hattersley (he's even on the wikileaks BNP membership list).\n\nMight want to take a look at this one @reformparty_uk / @Nigel_Farage",
        "created_at": "2025-04-01 12:54:33"
    },
    {
        "tweet_id": 1907308812953853972,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907308812953853972",
        "tweet_content": "Reform UK Doncaster Mayoral candidate Alexander Jones in row after page gloats about Gaza war's impact on gold \n\nhttps://t.co/cd5hGabGpb",
        "created_at": "2025-04-02 05:47:11"
    },
    {
        "tweet_id": 1907387782601093329,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907387782601093329",
        "tweet_content": "Imagine voting for a candidate that uses the phrase 'black cunt'?\n\nMeet Reform UK's Elliott Allman (@ElliottGCAllman), Reform Deputy Chairman for North West #Leicestershire and candidate for #Coalville North. He does.\n\n@ReformNWL, @reformparty_uk and @Joseph_Boam - is this the sort of views your candidates hold?",
        "created_at": "2025-04-02 11:00:59"
    },
    {
        "tweet_id": 1907394494615470567,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907394494615470567",
        "tweet_content": "Elliott Allman, Reform UK Reform Deputy Chairman for North West #Leicestershire and candidate for #Coalville North thinks that he's matured because now he's 38 he doesn't call people 'black cunts' anymore, like he did when he was 25.\n\nSomehow it's hard to believe.",
        "created_at": "2025-04-02 11:27:39"
    },
    {
        "tweet_id": 1907495707675963601,
        "author_id": 1318935853,
        "url": "https://x.com/McivorJaymey/status/1907495707675963601",
        "tweet_content": "Whilst the below gives tranquil Essex vibes, truth is that the town is being wrecked by overdevelopment and excessive traffic caused by a total lack of planning.\n\nThis is why we need common sense running our councils.\n\nOnly Reform UK will FIX IT\n\n#VoteReform https://t.co/zaxY1tQyAN",
        "created_at": "2025-04-02 18:09:50"
    },
    {
        "tweet_id": 1907524561035239473,
        "author_id": 845157941292380161,
        "url": "https://x.com/ElectionMapsUK/status/1907524561035239473",
        "tweet_content": "Runcorn & Helsby By-Election Candidates:\n\n🛡️ Blaiklock (ED)\n📙 Clarke (LIB)\n🌍 Copeman (GRN)\n🔶 Duffy (LDM)\n⚙️ Ford (WPB)\n🎩 Hope (MRLP)\n🌳 Houlston (CON)\n⚡ Hughest (VOLT)\n🙋 McKie (Ind)\n📜 Moore (ECP)\n🔴 Murphy (SDP)\n➡️ Pochin (RFM)\n🌹 Shore (LAB)\n🇪🇺 Stevens (REU)\n🙋 Williams (Ind)",
        "created_at": "2025-04-02 20:04:30"
    },
    {
        "tweet_id": 1907524561035239473,
        "author_id": 845157941292380161,
        "url": "https://x.com/ElectionMapsUK/status/1907524561035239473",
        "tweet_content": "Runcorn & Helsby By-Election Candidates:\n\n🛡️ Blaiklock (ED)\n📙 Clarke (LIB)\n🌍 Copeman (GRN)\n🔶 Duffy (LDM)\n⚙️ Ford (WPB)\n🎩 Hope (MRLP)\n🌳 Houlston (CON)\n⚡ Hughest (VOLT)\n🙋 McKie (Ind)\n📜 Moore (ECP)\n🔴 Murphy (SDP)\n➡️ Pochin (RFM)\n🌹 Shore (LAB)\n🇪🇺 Stevens (REU)\n🙋 Williams (Ind)",
        "created_at": "2025-04-02 20:04:30"
    },
    {
        "tweet_id": 1907532726745399370,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907532726745399370",
        "tweet_content": "If only you had attended the last Essex Council budget meeting Cllr Tax Dodge you might be part of running the council.\n\nOh wait, you weren’t allowed to, was that because you owe council tax?\n\nSeeing that your company went in to liquidation last month with you owing £141k, you’re not one to lecture on running things.",
        "created_at": "2025-04-02 20:36:56"
    },
    {
        "tweet_id": 1907532819057750526,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907532819057750526",
        "tweet_content": "If only you had attended the last Essex Council budget meeting Cllr Tax Dodge you might be part of running the council.\n\nOh wait, you weren’t allowed to, was that because you owe council tax?\n\nSeeing that your company went in to liquidation last month with you owing £141k, you’re not one to lecture on running things.",
        "created_at": "2025-04-02 20:37:18"
    },
    {
        "tweet_id": 1907662669093487005,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907662669093487005",
        "tweet_content": "“Keep fighting the good fight, complete respect brother.”\n\nDoncaster Reform UK Mayoral candidate Alexander Jones on Andrew Tate\n\nhttps://t.co/u9UKkIksKs",
        "created_at": "2025-04-03 05:13:17"
    },
    {
        "tweet_id": 1907789277271904602,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907789277271904602",
        "tweet_content": "@Tuskinhell @AndrewB09544249 Ha, Jolyon Down has been out memed and he’s upset.",
        "created_at": "2025-04-03 13:36:23"
    },
    {
        "tweet_id": 1907791714951069823,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907791714951069823",
        "tweet_content": "Looks like Reform UK chair for North West Leicestershire @Joseph_Boam is fine with this.",
        "created_at": "2025-04-03 13:46:04"
    },
    {
        "tweet_id": 1907791714951069823,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907791714951069823",
        "tweet_content": "Looks like Reform UK chair for North West Leicestershire @Joseph_Boam is fine with this.",
        "created_at": "2025-04-03 13:46:04"
    },
    {
        "tweet_id": 1907878864904401160,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907878864904401160",
        "tweet_content": "Elliott Allman (@ElliottGCAllman) Reform UK candidate for #Coalville North & Reform North West Leicestershire Deputy Chair has been discussing with his branch colleagues how to ‘lose the heat’ after we exposed him for posting on social media using the phrase ‘black cunt’.\n\nCan you believe that his branch colleague in Reform NWL said:\n\n“Have you a black friend you can have your picture taken with? I always have a black mate to pull out my back pocket.”?\n\nIncredible advice.\n\n@Joseph_Boam, as chair for @ReformNWL, you’ve said and done nothing. What type of branch are you running? \n\nShow him the door @reformparty_uk.",
        "created_at": "2025-04-03 19:32:22"
    },
    {
        "tweet_id": 1907878864904401160,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1907878864904401160",
        "tweet_content": "Elliott Allman (@ElliottGCAllman) Reform UK candidate for #Coalville North & Reform North West Leicestershire Deputy Chair has been discussing with his branch colleagues how to ‘lose the heat’ after we exposed him for posting on social media using the phrase ‘black cunt’.\n\nCan you believe that his branch colleague in Reform NWL said:\n\n“Have you a black friend you can have your picture taken with? I always have a black mate to pull out my back pocket.”?\n\nIncredible advice.\n\n@Joseph_Boam, as chair for @ReformNWL, you’ve said and done nothing. What type of branch are you running? \n\nShow him the door @reformparty_uk.",
        "created_at": "2025-04-03 19:32:22"
    },
    {
        "tweet_id": 1908082167038546057,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908082167038546057",
        "tweet_content": "🧨Andrea Jenkyns Lying About Lincolnshire Address on Nomination Papers? Does use of this address disqualify her as a candidate?\n\nReform UK's @AndreaJenkyns has handed in her nominations for Greater Lincolnshire Mayor, but there's a slight issue with it... she doesn't live in Lincolnshire and the rules for standing as mayor are clear that you must.\n\n1) She registered to vote at a Lincolnshire address just one day before handing in her nomination forms: April 1st 2025.\n\n2) She has changed addresses this month (including one at a Branch Chair's house) for her registration (see in pictures).\n\n3) She lives in East Ardesley in Leeds, Yorkshire. She stated she didn't live in Lincolnshire in an interview just a couple of weeks ago, Jenkyns said she would only move there if she won: https://t.co/ICUW9YBz7I\n\nThis is quite serious.",
        "created_at": "2025-04-04 09:00:13"
    },
    {
        "tweet_id": 1908082167038546057,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908082167038546057",
        "tweet_content": "🧨Andrea Jenkyns Lying About Lincolnshire Address on Nomination Papers? Does use of this address disqualify her as a candidate?\n\nReform UK's @AndreaJenkyns has handed in her nominations for Greater Lincolnshire Mayor, but there's a slight issue with it... she doesn't live in Lincolnshire and the rules for standing as mayor are clear that you must.\n\n1) She registered to vote at a Lincolnshire address just one day before handing in her nomination forms: April 1st 2025.\n\n2) She has changed addresses this month (including one at a Branch Chair's house) for her registration (see in pictures).\n\n3) She lives in East Ardesley in Leeds, Yorkshire. She stated she didn't live in Lincolnshire in an interview just a couple of weeks ago, Jenkyns said she would only move there if she won: https://t.co/ICUW9YBz7I\n\nThis is quite serious.",
        "created_at": "2025-04-04 09:00:13"
    },
    {
        "tweet_id": 1908082167038546057,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908082167038546057",
        "tweet_content": "🧨Andrea Jenkyns Lying About Lincolnshire Address on Nomination Papers? Does use of this address disqualify her as a candidate?\n\nReform UK's @AndreaJenkyns has handed in her nominations for Greater Lincolnshire Mayor, but there's a slight issue with it... she doesn't live in Lincolnshire and the rules for standing as mayor are clear that you must.\n\n1) She registered to vote at a Lincolnshire address just one day before handing in her nomination forms: April 1st 2025.\n\n2) She has changed addresses this month (including one at a Branch Chair's house) for her registration (see in pictures).\n\n3) She lives in East Ardesley in Leeds, Yorkshire. She stated she didn't live in Lincolnshire in an interview just a couple of weeks ago, Jenkyns said she would only move there if she won: https://t.co/ICUW9YBz7I\n\nThis is quite serious.",
        "created_at": "2025-04-04 09:00:13"
    },
    {
        "tweet_id": 1908082167038546057,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908082167038546057",
        "tweet_content": "🧨Andrea Jenkyns Lying About Lincolnshire Address on Nomination Papers? Does use of this address disqualify her as a candidate?\n\nReform UK's @AndreaJenkyns has handed in her nominations for Greater Lincolnshire Mayor, but there's a slight issue with it... she doesn't live in Lincolnshire and the rules for standing as mayor are clear that you must.\n\n1) She registered to vote at a Lincolnshire address just one day before handing in her nomination forms: April 1st 2025.\n\n2) She has changed addresses this month (including one at a Branch Chair's house) for her registration (see in pictures).\n\n3) She lives in East Ardesley in Leeds, Yorkshire. She stated she didn't live in Lincolnshire in an interview just a couple of weeks ago, Jenkyns said she would only move there if she won: https://t.co/ICUW9YBz7I\n\nThis is quite serious.",
        "created_at": "2025-04-04 09:00:13"
    },
    {
        "tweet_id": 1908082167038546057,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908082167038546057",
        "tweet_content": "🧨Andrea Jenkyns Lying About Lincolnshire Address on Nomination Papers? Does use of this address disqualify her as a candidate?\n\nReform UK's @AndreaJenkyns has handed in her nominations for Greater Lincolnshire Mayor, but there's a slight issue with it... she doesn't live in Lincolnshire and the rules for standing as mayor are clear that you must.\n\n1) She registered to vote at a Lincolnshire address just one day before handing in her nomination forms: April 1st 2025.\n\n2) She has changed addresses this month (including one at a Branch Chair's house) for her registration (see in pictures).\n\n3) She lives in East Ardesley in Leeds, Yorkshire. She stated she didn't live in Lincolnshire in an interview just a couple of weeks ago, Jenkyns said she would only move there if she won: https://t.co/ICUW9YBz7I\n\nThis is quite serious.",
        "created_at": "2025-04-04 09:00:13"
    },
    {
        "tweet_id": 1908135142356349350,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135142356349350",
        "tweet_content": "Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire. \n\nThese posts are in April / March 2025 alone... https://t.co/zNNJRzhdEK",
        "created_at": "2025-04-04 12:30:44"
    },
    {
        "tweet_id": 1908135147821551926,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135147821551926",
        "tweet_content": "Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire.\n\nHer views on Islam.\n\nThese posts are in April / March 2025 alone... https://t.co/X0OOcqTEge",
        "created_at": "2025-04-04 12:30:45"
    },
    {
        "tweet_id": 1908135156071661994,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135156071661994",
        "tweet_content": "Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire.\n\nHomophobia and Transphobia.\n\nThese posts are in April / March 2025 alone... https://t.co/3V1zT1Ba95",
        "created_at": "2025-04-04 12:30:47"
    },
    {
        "tweet_id": 1908135162765816050,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135162765816050",
        "tweet_content": "Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire.\n\nCovid / mRNA misinformation\n\nThese posts are in April / March 2025 alone... https://t.co/CQUqYZroSo",
        "created_at": "2025-04-04 12:30:48"
    },
    {
        "tweet_id": 1908135168918896923,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135168918896923",
        "tweet_content": "Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire.\n\nPride misinformation, further homophobia.\n\nThese posts are from 2025 alone... https://t.co/bEqw40O6CF",
        "created_at": "2025-04-04 12:30:50"
    },
    {
        "tweet_id": 1908135174157578623,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135174157578623",
        "tweet_content": "Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire.\n\nBritain is Christian. https://t.co/nnGvLu2Izl",
        "created_at": "2025-04-04 12:30:51"
    },
    {
        "tweet_id": 1908135179819860148,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135179819860148",
        "tweet_content": "Finally, here's Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire promoting a Britain First march last month... https://t.co/WReiKbmhOk",
        "created_at": "2025-04-04 12:30:52"
    },
    {
        "tweet_id": 1908135179819860148,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908135179819860148",
        "tweet_content": "Finally, here's Miriam Thomas, Reform UK candidate standing in Aylesbury East, Buckinghamshire promoting a Britain First march last month... https://t.co/WReiKbmhOk",
        "created_at": "2025-04-04 12:30:52"
    },
    {
        "tweet_id": 1908241361595490811,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908241361595490811",
        "tweet_content": "Reform's Arron Banks defends calling Bristol ‘little Somalia’ — and has a go at Romanians\n\nThe Reform candidate said he did not think it was racist to blame Somalians for crime in Bristol\n\nhttps://t.co/J3EJdhz7pn",
        "created_at": "2025-04-04 19:32:48"
    },
    {
        "tweet_id": 1908241361595490811,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908241361595490811",
        "tweet_content": "Reform's Arron Banks defends calling Bristol ‘little Somalia’ — and has a go at Romanians\n\nThe Reform candidate said he did not think it was racist to blame Somalians for crime in Bristol\n\nhttps://t.co/J3EJdhz7pn",
        "created_at": "2025-04-04 19:32:48"
    },
    {
        "tweet_id": 1908397339099660472,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908397339099660472",
        "tweet_content": "Still no explanation from @andreajenkyns or @reformparty_uk about why she first registered herself at a branch chairs house, then at the 11th hour another random one.\n\nSeems she’s conveniently found an address in Lincolnshire to register at because the reality is, Reform UK’s candidate for Mayor of Greater Lincolnshire lives in Yorkshire.\n\nThe Dodgy Dame strikes again!",
        "created_at": "2025-04-05 05:52:36"
    },
    {
        "tweet_id": 1908397339099660472,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908397339099660472",
        "tweet_content": "Still no explanation from @andreajenkyns or @reformparty_uk about why she first registered herself at a branch chairs house, then at the 11th hour another random one.\n\nSeems she’s conveniently found an address in Lincolnshire to register at because the reality is, Reform UK’s candidate for Mayor of Greater Lincolnshire lives in Yorkshire.\n\nThe Dodgy Dame strikes again!",
        "created_at": "2025-04-05 05:52:36"
    },
    {
        "tweet_id": 1908397444687159546,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908397444687159546",
        "tweet_content": "Reform UK in NW Leicestershire have a racism problem, and their chair @Joseph_Boam is too weak to do anything about it.\n\nHe’s promoting hasn’t taken action on candidate @ElliottGCAllman for using the term ‘black cunt’ in a social post. Allman is the Reform NWL Deputy.\n\nWhen it was revealed Allman was given this advice:\n\n“Have you a black friend you can have your picture taken with? I always have a black mate to pull out my back pocket.”\n\nBoam responded about WhatsApp rules, but has since deleted his response.\n\nAllman should stand down as a candidate. If you take no action, Joseph, then you should.\n\n@reformparty_uk, it’s time you rid Reform Leicestershire of racism.",
        "created_at": "2025-04-05 05:53:01"
    },
    {
        "tweet_id": 1908397444687159546,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908397444687159546",
        "tweet_content": "Reform UK in NW Leicestershire have a racism problem, and their chair @Joseph_Boam is too weak to do anything about it.\n\nHe’s promoting hasn’t taken action on candidate @ElliottGCAllman for using the term ‘black cunt’ in a social post. Allman is the Reform NWL Deputy.\n\nWhen it was revealed Allman was given this advice:\n\n“Have you a black friend you can have your picture taken with? I always have a black mate to pull out my back pocket.”\n\nBoam responded about WhatsApp rules, but has since deleted his response.\n\nAllman should stand down as a candidate. If you take no action, Joseph, then you should.\n\n@reformparty_uk, it’s time you rid Reform Leicestershire of racism.",
        "created_at": "2025-04-05 05:53:01"
    },
    {
        "tweet_id": 1908413579520287158,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908413579520287158",
        "tweet_content": "Norman Murphy, Reform Candidate for Scarborough Town Council, Northstead. Former UKIP and Independent Councillor.\n\nHis feed is a constant stream of anti-Muslim rhetoric and hatred. https://t.co/4mT4ZHIh6v",
        "created_at": "2025-04-05 06:57:08"
    },
    {
        "tweet_id": 1908413585664962953,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908413585664962953",
        "tweet_content": "Norman Murphy, Reform Candidate for Scarborough Town Council hates Muslims. https://t.co/fCiqGzq8OW",
        "created_at": "2025-04-05 06:57:10"
    },
    {
        "tweet_id": 1908413590496747765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908413590496747765",
        "tweet_content": "Norman Murphy, Reform UK Candidate for Scarborough Town Council on immigration. It's more than just concern, he's posting stuff like this daily. https://t.co/c2NeEUV2Li",
        "created_at": "2025-04-05 06:57:11"
    },
    {
        "tweet_id": 1908413596863705193,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908413596863705193",
        "tweet_content": "Norman Murphy, Reform UK Candidate for Scarborough Town Council is also transphobic. https://t.co/86XYU1vmVT",
        "created_at": "2025-04-05 06:57:12"
    },
    {
        "tweet_id": 1908426724330602680,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908426724330602680",
        "tweet_content": "@HeathcliffUT99 @andreajenkyns @reformparty_uk She didn’t have a place in Lincolnshire when that article was published according to her registering on the register, and not the one she’s now registered at.",
        "created_at": "2025-04-05 07:49:22"
    },
    {
        "tweet_id": 1908753138582204801,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908753138582204801",
        "tweet_content": "Neil Ferris is Reform UK candidate in Lanivet, Blisland & Bodmin St Lawrence, Cornwall in May.\n\nUntil retirement, he used to take his helicopter to work every day. Collecting 3 of them.\n\nYet, to show you he’s in touch with the common man, he’s standing for the ‘people’s party’ in Cornwall and he’s here to lecture you about Net Zero and immigrants.\n\nhttps://t.co/Wpx7DYj3QS",
        "created_at": "2025-04-06 05:26:25"
    },
    {
        "tweet_id": 1908753138582204801,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908753138582204801",
        "tweet_content": "Neil Ferris is Reform UK candidate in Lanivet, Blisland & Bodmin St Lawrence, Cornwall in May.\n\nUntil retirement, he used to take his helicopter to work every day. Collecting 3 of them.\n\nYet, to show you he’s in touch with the common man, he’s standing for the ‘people’s party’ in Cornwall and he’s here to lecture you about Net Zero and immigrants.\n\nhttps://t.co/Wpx7DYj3QS",
        "created_at": "2025-04-06 05:26:25"
    },
    {
        "tweet_id": 1908769860764463335,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908769860764463335",
        "tweet_content": "Donna Edmunds is the Reform UK candidate for Hodnet Ward in Shropshire Council. \n\n@Donna_Rachel_ has a bit of a chequered political past.\n\nLet’s take a look at it… https://t.co/ZABlfUUxoP",
        "created_at": "2025-04-06 06:32:52"
    },
    {
        "tweet_id": 1908769864166089049,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908769864166089049",
        "tweet_content": "Donna Edmunds, the Reform UK candidate for Hodnet Ward in Shropshire Council would like people to forget her comments on women and gay people when she was a UKIP councillor.\n\n@nigel_farage himself said about Donna Edmunds: “Whilst we are a libertarian party this kind of ultra-libertarianism really goes beyond what is acceptable.”",
        "created_at": "2025-04-06 06:32:53"
    },
    {
        "tweet_id": 1908769870843457901,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908769870843457901",
        "tweet_content": "She has held posts at various right wing think tanks including Director of Research at Progressive Vision, a contributor to The Freedom Association and Head of Media at the Bow Group. She has worked in the offices of Therese Coffey MP and former UKIP MEP Roger Helmer. Edmunds https://t.co/RcxWwg7EQR",
        "created_at": "2025-04-06 06:32:55"
    },
    {
        "tweet_id": 1908769875813708047,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908769875813708047",
        "tweet_content": "She’s currently West Mids Regional Director for @GreatBritishPAC.",
        "created_at": "2025-04-06 06:32:56"
    },
    {
        "tweet_id": 1908803829392375823,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908803829392375823",
        "tweet_content": "Wonder if Donna Edmund, Reform UK candidate for Hodnet in Shropshire needs to tell @reformparty_uk and @ReformNorShrop that she wants to join a new party… https://t.co/ws5ntGAtPb",
        "created_at": "2025-04-06 08:47:51"
    },
    {
        "tweet_id": 1908912771904819423,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908912771904819423",
        "tweet_content": "It’s not really Joseph, you have taken no action as branch chair of @ReformNWL on @ElliottGCAllman calling someone a ‘black cunt’ or your supporter saying ‘it’s ok, just pull a photo of a black person with you out of your pocket’.\n\nYou’re branch chair and a candidate, step up and drop him and make a statement:\n\nhttps://t.co/kkWkoqgXUL\n\nOr do we just accept that Reform UK #Leicestershire North West is fine with racism?\n\n#ReformUK #ReformTrain #ReformRacism",
        "created_at": "2025-04-06 16:00:45"
    },
    {
        "tweet_id": 1908913486328955068,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908913486328955068",
        "tweet_content": "But yet you’re going to do nothing about racism in your party.\n\nYou, nor @Joseph_Boam have taken action as leader or branch chair of @ReformNWL on @ElliottGCAllman for calling someone a ‘black cunt’ or your supporter saying ‘it’s ok, just pull a photo of a black person with you out of your pocket’.\n\nYou’re lesser and branch chair and a candidate, step up and drop him and make a statement:\n\nhttps://t.co/kkWkoqgXUL\n\nOr do we just accept that @reformparty_uk and Reform UK #Leicestershire North West is fine with racism?\n\n#ReformUK #ReformTrain #ReformRacism",
        "created_at": "2025-04-06 16:03:35"
    },
    {
        "tweet_id": 1908914273499165060,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1908914273499165060",
        "tweet_content": "For a general election, but pretty sure they would reject you if you don’t deal with racism in your branch.\n\nYou have taken no action as branch chair of @ReformNWL on @ElliottGCAllman calling someone a ‘black cunt’ or your supporter saying ‘it’s ok, just pull a photo of a black person with you out of your pocket’.\n\nYou’re branch chair and a candidate, step up and drop him and make a statement:\n\nhttps://t.co/kkWkoqgXUL\n\nOr do we just accept that Reform UK #Leicestershire North West is fine with racism?",
        "created_at": "2025-04-06 16:06:43"
    },
    {
        "tweet_id": 1909177236353065218,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909177236353065218",
        "tweet_content": "Meet Ruben Robinson (@RubenLRobinson), Reform UK candidate for Mablethorpe in Lincolnshire and Chairman of NE Lincolnshire Branch.\n\nWe need to talk about his judgement...\n\nYou won't have heard of Ruben Robinson, but you'll have heard of his business partner (well, he was until he resigned in March): Dan Turner.\n\nYes, the Dan Turner that was a Reform UK candidate until he stood down after being convicted of defrauding a charity: https://t.co/vdiOScgq8H\n\nAs you can see, they ran Bullet Hospitality together:\nhttps://t.co/IGurc2mSKw\n\nSeems he didn't take either staff complaints or the situation with Dan Turner seriously.\n\nHow it's he going to take being a councillor seriously?",
        "created_at": "2025-04-07 09:31:38"
    },
    {
        "tweet_id": 1909177236353065218,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909177236353065218",
        "tweet_content": "Meet Ruben Robinson (@RubenLRobinson), Reform UK candidate for Mablethorpe in Lincolnshire and Chairman of NE Lincolnshire Branch.\n\nWe need to talk about his judgement...\n\nYou won't have heard of Ruben Robinson, but you'll have heard of his business partner (well, he was until he resigned in March): Dan Turner.\n\nYes, the Dan Turner that was a Reform UK candidate until he stood down after being convicted of defrauding a charity: https://t.co/vdiOScgq8H\n\nAs you can see, they ran Bullet Hospitality together:\nhttps://t.co/IGurc2mSKw\n\nSeems he didn't take either staff complaints or the situation with Dan Turner seriously.\n\nHow it's he going to take being a councillor seriously?",
        "created_at": "2025-04-07 09:31:38"
    },
    {
        "tweet_id": 1909309352814743739,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909309352814743739",
        "tweet_content": "Reform UK North West #Leicester chair @Joseph_Boam put out a statement and then deleted it.\n\nIt said Dave, seen below, had been removed from the WhatsApp group. Guess what? He’s back in.\n\nEven better, the racism and bigotry is so rife now in the NWL Reform UK group that Boam has had to make it admin only posting.\n\nWhen are you going to drop Racist Elliott Allman, Joseph?\n\nOr do you have the backbone of a jellyfish.\n\n@reformparty_uk",
        "created_at": "2025-04-07 18:16:37"
    },
    {
        "tweet_id": 1909497994321559710,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909497994321559710",
        "tweet_content": "Doncaster Reform candidate 'thrown under bus' by Nigel Farage says Tory hope\n\nhttps://t.co/d7a7LQDggb",
        "created_at": "2025-04-08 06:46:13"
    },
    {
        "tweet_id": 1909563027155763642,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909563027155763642",
        "tweet_content": "Two bits of bad news for @reformparty_uk Tiverton &amp; Minehead, Somerset and Devon.\n\n➡️ @RupertLowe10 isn't your MP anymore, but you've out him on the flyer.\n\n➡️ It's illegal. \n\nYou might not want him to know. https://t.co/RFRRO9whSm",
        "created_at": "2025-04-08 11:04:38"
    },
    {
        "tweet_id": 1909563027155763642,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909563027155763642",
        "tweet_content": "Two bits of bad news for @reformparty_uk Tiverton &amp; Minehead, Somerset and Devon.\n\n➡️ @RupertLowe10 isn't your MP anymore, but you've out him on the flyer.\n\n➡️ It's illegal. \n\nYou might not want him to know. https://t.co/RFRRO9whSm",
        "created_at": "2025-04-08 11:04:38"
    },
    {
        "tweet_id": 1909565353102815547,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909565353102815547",
        "tweet_content": "Richard Bullivant (@BullivantRich) is the Reform UK candidate for Tiverton West in Devon. His Twitter bio is \"Work hard, play harder\". \n\nSee what he means? Out of the 118 people he follows, most are like this... https://t.co/4A1eK3o56j",
        "created_at": "2025-04-08 11:13:52"
    },
    {
        "tweet_id": 1909565353102815547,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909565353102815547",
        "tweet_content": "Richard Bullivant (@BullivantRich) is the Reform UK candidate for Tiverton West in Devon. His Twitter bio is \"Work hard, play harder\". \n\nSee what he means? Out of the 118 people he follows, most are like this... https://t.co/4A1eK3o56j",
        "created_at": "2025-04-08 11:13:52"
    },
    {
        "tweet_id": 1909596256638324822,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909596256638324822",
        "tweet_content": "Oh hai, here's Mike Dudley, Reform UK's candidate for Warwick South (@ReformUKWarLeam) doing a gun kiss gesture, then Nazi salute?\n\nhttps://t.co/CfkBjDTofe\n\n#WarwickSouth https://t.co/pdfbtVCDFd",
        "created_at": "2025-04-08 13:16:40"
    },
    {
        "tweet_id": 1909852905605115929,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909852905605115929",
        "tweet_content": "@Torsi28498067 @andreajenkyns Was this her attempting to find an address in Lincolnshire to claim she was a resident for the electoral roll?",
        "created_at": "2025-04-09 06:16:30"
    },
    {
        "tweet_id": 1909874495306822020,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909874495306822020",
        "tweet_content": "Reform UK candidate for Wyre Rural Central, Lancashire, Matthew Salter - @M_J_Salter can’t seem to explain why campaign flyers from Preesall Quarry would have no details about the campaign on the imprint when he claims the flyers were printed and delivered by them.\n\nAll this whilst actually having Reform UK / his details on them.",
        "created_at": "2025-04-09 07:42:18"
    },
    {
        "tweet_id": 1909993278537113882,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909993278537113882",
        "tweet_content": "The Matthew Salter @M_J_Salter, Reform Candidate for Wyre Rural Central, Lancashire situation has got more murky.\n\nHis election agent is claiming she’s also the chair of the campaign. Dodgy as.\n\nHe claims the flyers endorsing him by the No to Preesall Quary Campaign were delivered by them.\n\nThey don’t have their details on them, but his.\n\nNow the ‘Chair’ of the campaign has chimed in: @LeanneMMurray03.\n\nTwo things: \n\n1) she just created account to weigh in.\n\n2) importantly - she’s his actual campaign agent (see the post below for Leanne Murray on his declaration).\n\nSo who is paying for the flyers?\n\nEither way @LancashireCC need to look in to this as seems there’s some concerning funding / election practices happening.\n\nIf the group printed the flyer, they have committed a breach of electoral law - on imprints and @LancsPolice should look in to this.",
        "created_at": "2025-04-09 15:34:18"
    },
    {
        "tweet_id": 1909993278537113882,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909993278537113882",
        "tweet_content": "The Matthew Salter @M_J_Salter, Reform Candidate for Wyre Rural Central, Lancashire situation has got more murky.\n\nHis election agent is claiming she’s also the chair of the campaign. Dodgy as.\n\nHe claims the flyers endorsing him by the No to Preesall Quary Campaign were delivered by them.\n\nThey don’t have their details on them, but his.\n\nNow the ‘Chair’ of the campaign has chimed in: @LeanneMMurray03.\n\nTwo things: \n\n1) she just created account to weigh in.\n\n2) importantly - she’s his actual campaign agent (see the post below for Leanne Murray on his declaration).\n\nSo who is paying for the flyers?\n\nEither way @LancashireCC need to look in to this as seems there’s some concerning funding / election practices happening.\n\nIf the group printed the flyer, they have committed a breach of electoral law - on imprints and @LancsPolice should look in to this.",
        "created_at": "2025-04-09 15:34:18"
    },
    {
        "tweet_id": 1909994036481445955,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1909994036481445955",
        "tweet_content": "Reform UK chair for NW Leicestershire @Joseph_Boam is having a mare. \n\nUnable to take decisive action and remove racist Elliott Allman, he’s struggling to control racism in the NWL WhatsApp group.\n\nImagine how he would administer a council role? 👀 https://t.co/78rWy8HWZq",
        "created_at": "2025-04-09 15:37:18"
    },
    {
        "tweet_id": 1910080840618713207,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910080840618713207",
        "tweet_content": "@Joseph_Boam @PaulHar82253108 @MJSquiresReform Shame you don’t want to stamp out racism in NW Leicestershire Reform UK.\n\nImagine supporting a candidate like Elliott Allman that calls people a “black cunt” and supporters that advise him to ‘take a photo with a black person’ to show you’re not racist.\n\nhttps://t.co/sgVkLkX1eR",
        "created_at": "2025-04-09 21:22:14"
    },
    {
        "tweet_id": 1910081371109769386,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910081371109769386",
        "tweet_content": "Reform UK breaking the law in Kent, putting the Kent County Council logo on election leaflets.",
        "created_at": "2025-04-09 21:24:21"
    },
    {
        "tweet_id": 1910230151855497407,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910230151855497407",
        "tweet_content": "Deputy council leader responds to Nigel Farage Cornwall claims \n\nhttps://t.co/ZRdRnF7TfH",
        "created_at": "2025-04-10 07:15:33"
    },
    {
        "tweet_id": 1910357955356041420,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910357955356041420",
        "tweet_content": "Update: Reform UK pulls Kent County Council election leaflet over election rule 'breach'\n\nhttps://t.co/gJmy91ElpZ",
        "created_at": "2025-04-10 15:43:23"
    },
    {
        "tweet_id": 1910374513734267390,
        "author_id": 1094881364887986177,
        "url": "https://x.com/reformparty_uk/status/1910374513734267390",
        "tweet_content": "Vote Banksy for Bristol and the West of England on May 1st. 🇬🇧 https://t.co/8TPr15g7lQ",
        "created_at": "2025-04-10 16:49:11"
    },
    {
        "tweet_id": 1910374513734267390,
        "author_id": 1094881364887986177,
        "url": "https://x.com/reformparty_uk/status/1910374513734267390",
        "tweet_content": "Vote Banksy for Bristol and the West of England on May 1st. 🇬🇧 https://t.co/8TPr15g7lQ",
        "created_at": "2025-04-10 16:49:11"
    },
    {
        "tweet_id": 1910583827090579948,
        "author_id": 1466783923,
        "url": "https://x.com/TiceRichard/status/1910583827090579948",
        "tweet_content": "On Boston campaign trail yesterday…..one street from me\n\nHuge machete held by gentlemen \nDoubtful a chef….\n\nMany thanks to Lincs police for rapid response\n\nLawless Britain https://t.co/06wxq4kqI5",
        "created_at": "2025-04-11 06:40:55"
    },
    {
        "tweet_id": 1910626905650258104,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910626905650258104",
        "tweet_content": "Kenny Hope is Reform UK's confirmed candidate for Blaydon and Consett in the May elections.\n\nHere he is getting called out for insulting a random person for no reason. The commenter is right - @reformparty_uk how can he represent the community when he posts stuff like that?\n\nAnd stuff like this...",
        "created_at": "2025-04-11 09:32:06"
    },
    {
        "tweet_id": 1910626905650258104,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910626905650258104",
        "tweet_content": "Kenny Hope is Reform UK's confirmed candidate for Blaydon and Consett in the May elections.\n\nHere he is getting called out for insulting a random person for no reason. The commenter is right - @reformparty_uk how can he represent the community when he posts stuff like that?\n\nAnd stuff like this...",
        "created_at": "2025-04-11 09:32:06"
    },
    {
        "tweet_id": 1910644347919310952,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910644347919310952",
        "tweet_content": "Matt Podmore, the Reform UK candidate for Pittville &amp; St Pauls in Cheltenham thinks women police officers are a fantasy that endanger the public. https://t.co/2JWhPBMnZw",
        "created_at": "2025-04-11 10:41:25"
    },
    {
        "tweet_id": 1910644351480242607,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910644351480242607",
        "tweet_content": "Matt Podmore, the Reform UK candidate for Pittville &amp; St Pauls in Cheltenham has a lot to say about women. https://t.co/fVCzBTnLTU",
        "created_at": "2025-04-11 10:41:26"
    },
    {
        "tweet_id": 1910644359227203788,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910644359227203788",
        "tweet_content": "Then there's trans people, Matt Podmore, the Reform UK candidate for Pittville &amp; St Pauls in Cheltenham thinks they are mentally ill. https://t.co/WsMaoU71Ug",
        "created_at": "2025-04-11 10:41:27"
    },
    {
        "tweet_id": 1910644355695620373,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910644355695620373",
        "tweet_content": "Matt Podmore, the Reform UK candidate for Pittville &amp; St Pauls in Cheltenham think people who are obese post-pregnancy use it as an excuse for being lazy. https://t.co/N1KVU1Rh1j",
        "created_at": "2025-04-11 10:41:27"
    },
    {
        "tweet_id": 1910644367695438157,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1910644367695438157",
        "tweet_content": "Matt Podmore, the Reform UK candidate for Pittville &amp; St Pauls in Cheltenham also does not believe in democracy, he states 'communist parties should be illegal in the west.'\n\nSo much for free speech, Reform UK. https://t.co/7AlKePVDL7",
        "created_at": "2025-04-11 10:41:29"
    },
    {
        "tweet_id": 1911054130694549651,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1911054130694549651",
        "tweet_content": "Reform UK Buckinghamshire are having a bit of a nightmare, remember Miriam who was dropped?\n\nhttps://t.co/mj4glQY7pG",
        "created_at": "2025-04-12 13:49:45"
    },
    {
        "tweet_id": 1911133769207062943,
        "author_id": 19017675,
        "url": "https://x.com/Nigel_Farage/status/1911133769207062943",
        "tweet_content": "Parliament was recalled on a Saturday for the first time since 1982 to try and stop Reform.\n\nLabour are desperate to claim they are on the side of workers &amp; the PM went straight to Scunthorpe for a photo-call.\n\nIf we had not gone on Tuesday then today would never have happened. https://t.co/0ac9uthWYx",
        "created_at": "2025-04-12 19:06:12"
    },
    {
        "tweet_id": 1911457706663109101,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1911457706663109101",
        "tweet_content": "Seems Reform UK in Kent are still delivering this…\n\n@Kent_cc https://t.co/uXCv50hUEm",
        "created_at": "2025-04-13 16:33:25"
    },
    {
        "tweet_id": 1911494297586712713,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1911494297586712713",
        "tweet_content": "Clacton MP reveals new job as commentator for Australian network \n\nhttps://t.co/Syk4jYjm1D",
        "created_at": "2025-04-13 18:58:49"
    },
    {
        "tweet_id": 1911914007788736904,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1911914007788736904",
        "tweet_content": "Reform UK’s Chair for Reform UK Derbyshire Dales @RuseJeremy71394 seems to think that a fake Instagram account was set up to shame his candidate Max Bethell.\n\nWe have a screenshot of the whole feed but haven’t published it because it has his kids on it. \n\nPretty strange faking an Instagram account for a random Derbyshire council candidate.\n\nPlease just take some responsibility Jeremy.",
        "created_at": "2025-04-14 22:46:35"
    },
    {
        "tweet_id": 1911914007788736904,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1911914007788736904",
        "tweet_content": "Reform UK’s Chair for Reform UK Derbyshire Dales @RuseJeremy71394 seems to think that a fake Instagram account was set up to shame his candidate Max Bethell.\n\nWe have a screenshot of the whole feed but haven’t published it because it has his kids on it. \n\nPretty strange faking an Instagram account for a random Derbyshire council candidate.\n\nPlease just take some responsibility Jeremy.",
        "created_at": "2025-04-14 22:46:35"
    },
    {
        "tweet_id": 1912145008574017776,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912145008574017776",
        "tweet_content": "Reform UK Branch Chair for Derbyshire and candidate for Ashbourne South in Derbyshire, Jeremy Ruse.\n\nAfter emphatically denying a fellow candidate had posted a racist Instagram post and being challenged on his post about The Moors Murderers has responded by closing his Twitter account.\n\nHow’s that for an admission of guilt?",
        "created_at": "2025-04-15 14:04:30"
    },
    {
        "tweet_id": 1912151654486470815,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912151654486470815",
        "tweet_content": "Lee Anderson lying about housing illegal immigrants in Ashfield. 🤥 ➡️ \n\nThe leader of Ashfield Independents - Jason Zadrozny (@jason_zadrozny) on Ashfield council has recorded this video on Facebook to highlight how @LeeAndersonMP_  is lying in the lead up to the local elections to stir resentment.",
        "created_at": "2025-04-15 14:30:55"
    },
    {
        "tweet_id": 1912151654486470815,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912151654486470815",
        "tweet_content": "Lee Anderson lying about housing illegal immigrants in Ashfield. 🤥 ➡️ \n\nThe leader of Ashfield Independents - Jason Zadrozny (@jason_zadrozny) on Ashfield council has recorded this video on Facebook to highlight how @LeeAndersonMP_  is lying in the lead up to the local elections to stir resentment.",
        "created_at": "2025-04-15 14:30:55"
    },
    {
        "tweet_id": 1912374937685237933,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912374937685237933",
        "tweet_content": "Aylesbury local election candidate removed and suspended by Reform UK\n\nhttps://t.co/pE8i1sHlUK",
        "created_at": "2025-04-16 05:18:10"
    },
    {
        "tweet_id": 1912422191305490713,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912422191305490713",
        "tweet_content": "Shane Benton, Reform UK candidate for Benn, Warwickshire.\n\nHere he's breaking election law by using Warwickshire County Council's logo on his imagery.\n\nHe's also using an unauthorised image of Rugby School (we have evidence), which may imply their endorsement, which they have not given.",
        "created_at": "2025-04-16 08:25:56"
    },
    {
        "tweet_id": 1912422191305490713,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912422191305490713",
        "tweet_content": "Shane Benton, Reform UK candidate for Benn, Warwickshire.\n\nHere he's breaking election law by using Warwickshire County Council's logo on his imagery.\n\nHe's also using an unauthorised image of Rugby School (we have evidence), which may imply their endorsement, which they have not given.",
        "created_at": "2025-04-16 08:25:56"
    },
    {
        "tweet_id": 1912434442347458935,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434442347458935",
        "tweet_content": "Susan Eacock (@SusanEacock), Reform UK candidate for Redditch South, Worcestershire.\n\nSeriously @ReformParty_UK, how did you not pick this one up in your vetting?! https://t.co/YE5XaXWQsU",
        "created_at": "2025-04-16 09:14:37"
    },
    {
        "tweet_id": 1912434446503993381,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434446503993381",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nThere's this comparison... https://t.co/4hmPuGDQd7",
        "created_at": "2025-04-16 09:14:38"
    },
    {
        "tweet_id": 1912434452199862428,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434452199862428",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire. There's homophobia... https://t.co/kp0MDbAyv0",
        "created_at": "2025-04-16 09:14:39"
    },
    {
        "tweet_id": 1912434458503917828,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434458503917828",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire. \n\nThere's transphobia... https://t.co/12NhFWmoRO",
        "created_at": "2025-04-16 09:14:40"
    },
    {
        "tweet_id": 1912434467127370122,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434467127370122",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nThere's this recurring story about Muslim neighbours and their dislike of dogs, why was their religion important? https://t.co/lorYr55yAp",
        "created_at": "2025-04-16 09:14:42"
    },
    {
        "tweet_id": 1912434463360901191,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434463360901191",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nThere's calling Angela Rayner a slapper... https://t.co/ICpVGSeMm0",
        "created_at": "2025-04-16 09:14:42"
    },
    {
        "tweet_id": 1912434471036387345,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434471036387345",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nThere's agreeing with Boris Johnson's 'letter boxes' comment. https://t.co/pT0HqVyV4D",
        "created_at": "2025-04-16 09:14:43"
    },
    {
        "tweet_id": 1912434475201364253,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434475201364253",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nThere's outright anti-Muslim comments. https://t.co/rjksHWP77H",
        "created_at": "2025-04-16 09:14:44"
    },
    {
        "tweet_id": 1912434479064363511,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434479064363511",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nThere's saying the Prime Minister isn't wearing his poppy because his wife is Jewish and he doesn't want to upset Muslims. https://t.co/wlZYdZ9tbC",
        "created_at": "2025-04-16 09:14:45"
    },
    {
        "tweet_id": 1912434483497783328,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912434483497783328",
        "tweet_content": "Sue Eacock, Reform UK candidate for Redditch South, Worcestershire.\n\nBlack people on TV... https://t.co/5mRrtgIfZ1",
        "created_at": "2025-04-16 09:14:46"
    },
    {
        "tweet_id": 1912549184869130576,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912549184869130576",
        "tweet_content": "Gary Farmer (@garycharlesxx) is Reform UK’s Branch chair in Brighton and Hove and candidate in Westbourne and Poet's Corner.\n\nSUTR in Brighton &amp; Hove have done a powerful review of his online content:\n\nhttps://t.co/biabcUZmMe",
        "created_at": "2025-04-16 16:50:33"
    },
    {
        "tweet_id": 1912549184869130576,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912549184869130576",
        "tweet_content": "Gary Farmer (@garycharlesxx) is Reform UK’s Branch chair in Brighton and Hove and candidate in Westbourne and Poet's Corner.\n\nSUTR in Brighton &amp; Hove have done a powerful review of his online content:\n\nhttps://t.co/biabcUZmMe",
        "created_at": "2025-04-16 16:50:33"
    },
    {
        "tweet_id": 1912549184869130576,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912549184869130576",
        "tweet_content": "Gary Farmer (@garycharlesxx) is Reform UK’s Branch chair in Brighton and Hove and candidate in Westbourne and Poet's Corner.\n\nSUTR in Brighton &amp; Hove have done a powerful review of his online content:\n\nhttps://t.co/biabcUZmMe",
        "created_at": "2025-04-16 16:50:33"
    },
    {
        "tweet_id": 1912549184869130576,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912549184869130576",
        "tweet_content": "Gary Farmer (@garycharlesxx) is Reform UK’s Branch chair in Brighton and Hove and candidate in Westbourne and Poet's Corner.\n\nSUTR in Brighton &amp; Hove have done a powerful review of his online content:\n\nhttps://t.co/biabcUZmMe",
        "created_at": "2025-04-16 16:50:33"
    },
    {
        "tweet_id": 1912580053071761664,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912580053071761664",
        "tweet_content": "Reform UK’s Runcorn candidate @SarahForRuncorn hit with misconduct finding during time as magistrate\n\nhttps://t.co/dTSCvPfRW4",
        "created_at": "2025-04-16 18:53:13"
    },
    {
        "tweet_id": 1912732100416954746,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912732100416954746",
        "tweet_content": "Councillor slams 'racist' social media posts made by Reform UK’s Buckingham local election candidate \n\nhttps://t.co/u8BlN5XOHR",
        "created_at": "2025-04-17 04:57:24"
    },
    {
        "tweet_id": 1912806188367876374,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912806188367876374",
        "tweet_content": "John Birch, Reform UK's candidate for Admirals & Cawston, Warwickshire, believes we should erect barbed wire across the whole Kent coast to stop 'Muslim invaders'.\n\nHe also thinks the RNLI should fire every volunteer in Kent (bit difficult, as volunteers, they don't get paid for their work). And of course he thinks they're a Taxi service.",
        "created_at": "2025-04-17 09:51:48"
    },
    {
        "tweet_id": 1912806188367876374,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912806188367876374",
        "tweet_content": "John Birch, Reform UK's candidate for Admirals & Cawston, Warwickshire, believes we should erect barbed wire across the whole Kent coast to stop 'Muslim invaders'.\n\nHe also thinks the RNLI should fire every volunteer in Kent (bit difficult, as volunteers, they don't get paid for their work). And of course he thinks they're a Taxi service.",
        "created_at": "2025-04-17 09:51:48"
    },
    {
        "tweet_id": 1912806202225893515,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912806202225893515",
        "tweet_content": "As said, John Birch, Reform UK candidate for Admirals &amp; Cawston, Warwickshire hates Muslims... https://t.co/Z9htUrvmuf",
        "created_at": "2025-04-17 09:51:51"
    },
    {
        "tweet_id": 1912870572322586671,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1912870572322586671",
        "tweet_content": "Tommy Robinson supporters and conspiracy theorists: Meet Reform UK’s Lincolnshire candidates \n\nhttps://t.co/3aeyrxwzuN",
        "created_at": "2025-04-17 14:07:38"
    },
    {
        "tweet_id": 1913131643155492936,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913131643155492936",
        "tweet_content": "Lyndsey Fox is Reform UK’s candidate in Bishop Auckland, County Durham. She was a Conservative Councillor for Spennymoor Town Council but was kicked out of her position last year for non attendance.\n\nShe was also featured in yesterday’s post by Hope Not Hate: https://t.co/DrbDdEVjJM\n\nThe local branch is not happy about her selection…",
        "created_at": "2025-04-18 07:25:02"
    },
    {
        "tweet_id": 1913173253050220675,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913173253050220675",
        "tweet_content": "Alistair Arundell (@Microlightquikr), Reform UK's candidate for Boston Coastal, Lincolnshire.\n\nHe runs 41 businesses - does he have time to be a councillor?\n\nWe ask because he quit after 5 months last time he was one, when he was a Conservative. He quit because he couldn't commit time to giving the job 100% (his words):\n\nhttps://t.co/RXZzD8HhnR\n\nThe big question is - is his motive to serve Boston residents or his property portfolio?",
        "created_at": "2025-04-18 10:10:23"
    },
    {
        "tweet_id": 1913173253050220675,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913173253050220675",
        "tweet_content": "Alistair Arundell (@Microlightquikr), Reform UK's candidate for Boston Coastal, Lincolnshire.\n\nHe runs 41 businesses - does he have time to be a councillor?\n\nWe ask because he quit after 5 months last time he was one, when he was a Conservative. He quit because he couldn't commit time to giving the job 100% (his words):\n\nhttps://t.co/RXZzD8HhnR\n\nThe big question is - is his motive to serve Boston residents or his property portfolio?",
        "created_at": "2025-04-18 10:10:23"
    },
    {
        "tweet_id": 1913174974434533643,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913174974434533643",
        "tweet_content": "HUGE NEWS: @AndreaJenkyns could be disqualified as Reform UK candidate for Lincolnshire Mayor amid claims she lied about her address\n\nhttps://t.co/7adUInQL1Z",
        "created_at": "2025-04-18 10:17:13"
    },
    {
        "tweet_id": 1913505684831768641,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913505684831768641",
        "tweet_content": "Gary Bentley, Reform UK candidate for Cheadle and Checkley seems to be reusing his campaign posters from when he was an independent on the campaign trail. Bit deceptive, don’t you think? https://t.co/1p51DL0RI7",
        "created_at": "2025-04-19 08:11:21"
    },
    {
        "tweet_id": 1913551701149089843,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913551701149089843",
        "tweet_content": "Rumours are that Reform UK are in talks with a disgraced former Conservative minister who lost her seat at the last election.\n\nWe thought she was already running as their candidate for Lincolnshire Mayor.",
        "created_at": "2025-04-19 11:14:12"
    },
    {
        "tweet_id": 1913593663617118294,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913593663617118294",
        "tweet_content": "UPDATE on Robert Gibson, the Reform UK candidate, Spalding East, Lincolnshire, who dressed as Princess Fiona while aggressively humping Captain America.\n\nA dossier was presented to various officers at South Holland District Council on Monday 7th April and was referred to Lincolnshire Police on Tuesday 8th April by the returning officer James Gilbert.\n\nLet’s look at it.\n\nThe picture here from the Election Return shows Rob Gibson signed the return as Election Agent and therefore assuming responsibility for the Spending Return. The rules during an election are very clear, the source of every donation must be fully declared or the donation should be returned.\n\nFarage linked entities such as UKIP, the Brexit Campaign and the Brexit Party all tried to use methods to try and by-pass campaign funding rules leading to various actions being taken against them.\n\nReform UK can try to say that it's \"a smear\" but all of the evidence is publicly available. Perhaps their strategy is to ignore until after the election in the hope it doesn't create negative publicity during the election campaign.",
        "created_at": "2025-04-19 14:00:56"
    },
    {
        "tweet_id": 1913618550796804172,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913618550796804172",
        "tweet_content": "Reform UK’s Luke Parker, candidate for Preston East claims Finney House, #Preston to be used for asylum seekers branded ‘completely unfounded and misleading speculation’ by health chiefs\n\nhttps://t.co/JDSVpMuGBP",
        "created_at": "2025-04-19 15:39:50"
    },
    {
        "tweet_id": 1913662055569121713,
        "author_id": 1179055854794018816,
        "url": "https://x.com/marcolonghi4dn/status/1913662055569121713",
        "tweet_content": "Today a small ‘bostin’ team from #Dudley headed to Lincolnshire to help local @reformparty_uk candidates and the superb @andreajenkyns for Mayor. \n\nGreat to also bump into the ever present @TiceRichard whose energy for the Reform cause is amazing.\n@Nigel_Farage\n@ZiaYusufUK https://t.co/kOhC3j7PMB",
        "created_at": "2025-04-19 18:32:42"
    },
    {
        "tweet_id": 1913665847467315346,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913665847467315346",
        "tweet_content": "@marcolonghi4dn @reformparty_uk @andreajenkyns @TiceRichard @Nigel_Farage @ZiaYusufUK Whilst she headed from Leeds to join you. \n\n#Andrea4Yorkshire.",
        "created_at": "2025-04-19 18:47:46"
    },
    {
        "tweet_id": 1913665881659396161,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913665881659396161",
        "tweet_content": "Whilst she headed from Leeds to join you. \n\n#Andrea4Yorkshire.",
        "created_at": "2025-04-19 18:47:55"
    },
    {
        "tweet_id": 1913850850369286364,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913850850369286364",
        "tweet_content": "Reform UK’s Sarah Pochin (@SarahForRuncorn) candidate for Runcorn called for cut in Winter Fuel Allowance!\n\nThis will be hard to explain away.\n\nAfter locking her Facebook account when announced as their candidate, it is now open, and it reveals that in 2017 she called for the same cut in WFA that @reformparty_uk and @Nigel_Farage have been campaigning against.\n\nHere’s the video.\n\nIt was part of a Live Q&A with Jack Khan when she unsuccessfully ran to be Conservative MP of Bolton South East.",
        "created_at": "2025-04-20 07:02:55"
    },
    {
        "tweet_id": 1913850850369286364,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1913850850369286364",
        "tweet_content": "Reform UK’s Sarah Pochin (@SarahForRuncorn) candidate for Runcorn called for cut in Winter Fuel Allowance!\n\nThis will be hard to explain away.\n\nAfter locking her Facebook account when announced as their candidate, it is now open, and it reveals that in 2017 she called for the same cut in WFA that @reformparty_uk and @Nigel_Farage have been campaigning against.\n\nHere’s the video.\n\nIt was part of a Live Q&A with Jack Khan when she unsuccessfully ran to be Conservative MP of Bolton South East.",
        "created_at": "2025-04-20 07:02:55"
    },
    {
        "tweet_id": 1914042014905127066,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914042014905127066",
        "tweet_content": "Reform UK’s candidate in the Runcorn by-election Sarah Pochin (@SarahForRuncorn) posting lazy ‘Diane Abbott is thick’ memes?\n\nOf course she did. https://t.co/WgopQiwMN6",
        "created_at": "2025-04-20 19:42:32"
    },
    {
        "tweet_id": 1914220857158742381,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914220857158742381",
        "tweet_content": "Nigel Berrill, Reform UK candidate for #Kingsthorpe North, West #Northamptonshire.\n\nHe was in court last month for driving without insurance, got 6 points, and he wants to be a councillor.\n\nhttps://t.co/SustG3IB3L",
        "created_at": "2025-04-21 07:33:11"
    },
    {
        "tweet_id": 1914250803776217261,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914250803776217261",
        "tweet_content": "@Xsteveholl @CharlotteCGill Wow, look at you Steve, saying she was standing in Bolton South East in 2017. Which coincidentally we also said in the post you’re commenting about.\n\nAnd whilst we are being pedantic, it’s ’whose Autism’ not ‘who’s autism’ - nice ableism there.",
        "created_at": "2025-04-21 09:32:11"
    },
    {
        "tweet_id": 1914558976147996801,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914558976147996801",
        "tweet_content": "Reform UK’s candidate for Runcorn @SarahForRuncorn was asked in interview what the difference is between someone coming to the UK from Ukraine and someone crossing the channel to flee war in the Middle East.\n\nHer answer was to brand them illegal. Her deflection of the question doesn’t seem to have been scrutinised properly. \n\nSecondly, illegal immigrants don’t get a house, that’s a myth.\n\nhttps://t.co/uLkeA70GAA",
        "created_at": "2025-04-22 05:56:45"
    },
    {
        "tweet_id": 1914620780899430667,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914620780899430667",
        "tweet_content": "ANDREA JENKYNS' DAY OF RECKONING THIS FRIDAY\n\nWill she release phone records?\n\nThe recent Independent article on Andrea Jenkyns (@AndreaJenkyns), Reform UK's candidate potentially lying about the address she gave as proof of eligibility for standing as Greater Lincolnshire Mayor.\n\nThe hearing is to determine her eligibility to be on the electoral role in North Kesteven district following complaints she did not live at the address she used on her nomination papers. If she cannot prove this was her permanent residence then she can be removed from the electoral roll. If they do that, her candidacy will be voided and the election for Mayor will need to be re-run.\n\nhttps://t.co/LBCiUFn8TP\n\nThe matter has been referred to the police.\n\nShe needs to answer these questions on Friday:\n\n1) Was she was living at the address she gave on her nomination papers as her permanent residence?\n\n2) Do her mobile phone records to confirm where she was?\n\nIf she was living at the address given on her nomination papers her phone records will confirm that to the police.\n\nJenkyns can put an end to this right now, by releasing her phone records.\n\nSo we say - will you publish the records Andrea?",
        "created_at": "2025-04-22 10:02:20"
    },
    {
        "tweet_id": 1914620784259031540,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914620784259031540",
        "tweet_content": "Greater Lincolnshire Mayoral Election Re-run?\n\nIf it's proven she lied, the mayoral election will have to be rerun. If that happens, the cost to the council will be £2 million.\n\n£2 million.\n\nAndrea Jenkyns' and Reform UK's cavalier attitude to politics could be costly...",
        "created_at": "2025-04-22 10:02:21"
    },
    {
        "tweet_id": 1914721663163236833,
        "author_id": 1514620723628851201,
        "url": "https://x.com/Coramazov/status/1914721663163236833",
        "tweet_content": "Was up in Runcorn last week with @prospect_uk profiling the Reform candidate for a by-election that will set the course of British politics for the next four years. Read about @SarahForRuncorn, a very different type of @reformparty_uk candidate, below. https://t.co/hJAzLS1lgi",
        "created_at": "2025-04-22 16:43:12"
    },
    {
        "tweet_id": 1914935677315121313,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1914935677315121313",
        "tweet_content": "Reports that Reform UK’s Sarah Pochin (@SarahForRuncorn) was challenged on her support for Winter Fuel Allowance cuts at a Trinity Church, Runcorn hustings.\n\nSeems her response was to storm out.",
        "created_at": "2025-04-23 06:53:37"
    },
    {
        "tweet_id": 1915021187518021668,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915021187518021668",
        "tweet_content": "Congratulations David Shaw, Reform UK candidate in Fleetwood East, Lancashire for recently achieving a hygiene rating of 1 for your pub.\n\nHearing this whopping great sign is turning off customers.\n\nShudder to think what you'd do with a council brief... https://t.co/4DL4Lw4eEI",
        "created_at": "2025-04-23 12:33:25"
    },
    {
        "tweet_id": 1915021187518021668,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915021187518021668",
        "tweet_content": "Congratulations David Shaw, Reform UK candidate in Fleetwood East, Lancashire for recently achieving a hygiene rating of 1 for your pub.\n\nHearing this whopping great sign is turning off customers.\n\nShudder to think what you'd do with a council brief... https://t.co/4DL4Lw4eEI",
        "created_at": "2025-04-23 12:33:25"
    },
    {
        "tweet_id": 1915119378724761681,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915119378724761681",
        "tweet_content": "Far-Right Racism,Conspiracy Theorists and Andrew Tate Fans in Lax Leicestershire Branch \n\nhttps://t.co/fnSqy92Fi9",
        "created_at": "2025-04-23 19:03:35"
    },
    {
        "tweet_id": 1915265246849093924,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915265246849093924",
        "tweet_content": "Andrea, you live in Yorkshire…\n\nReform UK blast challenge over Lincolnshire candidate's right to stand \n\nhttps://t.co/IusznavOFp",
        "created_at": "2025-04-24 04:43:13"
    },
    {
        "tweet_id": 1915367347428241863,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915367347428241863",
        "tweet_content": "Norfolk Reform UK official under fire over 'abhorrent' posts on social media \n\nDave Harding, Reform UK's new Great Yarmouth branch chair...\n\nhttps://t.co/L5630YrGWo",
        "created_at": "2025-04-24 11:28:56"
    },
    {
        "tweet_id": 1915439587591414049,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915439587591414049",
        "tweet_content": "Reform UK in Wiltshire have been attacking the Tories for the leader's wife having a £9k portfolio.\n\nReminds us that @nigel_farage employed his wife AND his girlfriend (who got a very comfy 6 figure salary+expenses). They were investigated by OLAF for channeling money to UKIP.\n\nHer qualifications were being a waitress and ‘knowing’ the boss.\n\nhttps://t.co/3g1GshSZjK",
        "created_at": "2025-04-24 16:15:59"
    },
    {
        "tweet_id": 1915501178156208247,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915501178156208247",
        "tweet_content": "Remember @ElliottGCAllman? He’s the Reform UK North West Leicestershire Reform Deputy Chairman & candidate for Coalville North who used the phrase “black cunt”.\n\nTurns out his company is a surveying company: SV Surveying. He calls himself a ‘Chartered Surveyor’ and says his company is Regulated by @RICSnews.\n\nHe isn't a RICS member, which is a requirement to use the Chartered Surveyor designation. His company isn't on the Regulated by RICS list, because he isn't a member and wouldn't be able to apply. \n\nHe uses @theCIOB logos on his company literature, but again isn't a member and this goes against CIOB rules for the use of their logo. \n\nHe is a member of @CharteredICES and claims this makes his company \"Charted\" but CICES don't award chartership to members or companies.\n\nNot a good look for someone seeking votes. What else is the candidate embellishing?",
        "created_at": "2025-04-24 20:20:43"
    },
    {
        "tweet_id": 1915501178156208247,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915501178156208247",
        "tweet_content": "Remember @ElliottGCAllman? He’s the Reform UK North West Leicestershire Reform Deputy Chairman & candidate for Coalville North who used the phrase “black cunt”.\n\nTurns out his company is a surveying company: SV Surveying. He calls himself a ‘Chartered Surveyor’ and says his company is Regulated by @RICSnews.\n\nHe isn't a RICS member, which is a requirement to use the Chartered Surveyor designation. His company isn't on the Regulated by RICS list, because he isn't a member and wouldn't be able to apply. \n\nHe uses @theCIOB logos on his company literature, but again isn't a member and this goes against CIOB rules for the use of their logo. \n\nHe is a member of @CharteredICES and claims this makes his company \"Charted\" but CICES don't award chartership to members or companies.\n\nNot a good look for someone seeking votes. What else is the candidate embellishing?",
        "created_at": "2025-04-24 20:20:43"
    },
    {
        "tweet_id": 1915711888777715859,
        "author_id": 845157941292380161,
        "url": "https://x.com/ElectionMapsUK/status/1915711888777715859",
        "tweet_content": "West of England Mayoral Voting Intention:\n\nPage (GRN): 27% (+5)\nGodwin (LAB): 23% (-10)\nBanks (RFM): 18% (New)\nSmith (CON): 17% (-12)\nHenman (LDM): 13% (-3)\nScott (IND): 2% (New)\n\nVia @YouGov, 9-23 Apr.\nChanges w/ 2021 Election.",
        "created_at": "2025-04-25 10:18:01"
    },
    {
        "tweet_id": 1915725473499300023,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915725473499300023",
        "tweet_content": "With days to go before the Lincolnshire Mayoral contest LincsLive organised a hustings.  Five of the six candidates standing attended. Reform UK’s @AndreaJenkyns declined.\n\nHas she attended any hustings? Scared of the electorate...\n\nhttps://t.co/sqMgQzJDQR",
        "created_at": "2025-04-25 11:11:59"
    },
    {
        "tweet_id": 1915732480369271100,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915732480369271100",
        "tweet_content": "Lancashire Reform UK candidate shares far-right posts\n\nhttps://t.co/vW1ABBckWy",
        "created_at": "2025-04-25 11:39:50"
    },
    {
        "tweet_id": 1915862249421607160,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915862249421607160",
        "tweet_content": "How many times have you heard Reform UK and far-right commentators go on about teacher’s indoctrinating kids?\n\nWell, Ellis Newton, Reform UK candidate for West Lancashire East is a teacher at Runshaw College.\n\nHe thinks that the council, the Conservatives and Labour are incompetent.\n\nHe’s teaching children.\n\nJust saying.",
        "created_at": "2025-04-25 20:15:29"
    },
    {
        "tweet_id": 1915862249421607160,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915862249421607160",
        "tweet_content": "How many times have you heard Reform UK and far-right commentators go on about teacher’s indoctrinating kids?\n\nWell, Ellis Newton, Reform UK candidate for West Lancashire East is a teacher at Runshaw College.\n\nHe thinks that the council, the Conservatives and Labour are incompetent.\n\nHe’s teaching children.\n\nJust saying.",
        "created_at": "2025-04-25 20:15:29"
    },
    {
        "tweet_id": 1915866216477974636,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915866216477974636",
        "tweet_content": "James Bean, Reform UK candidate for North Wolds, Lincolnshire is worried about being a carrier politician. \n\n🐦 https://t.co/SgJf2EkDUZ",
        "created_at": "2025-04-25 20:31:15"
    },
    {
        "tweet_id": 1915871326742675623,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915871326742675623",
        "tweet_content": "Piling on. The voice of Yorkshire who is standing for Lincolnshire Mayor is hardly a victim. You think she’s an unsupported single mum? Bullshit. For the record her son attends a mainstream school.\n\nShe registered at her campaign manager’s address, then mysteriously another before the deadline.",
        "created_at": "2025-04-25 20:51:34"
    },
    {
        "tweet_id": 1915872849396470180,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915872849396470180",
        "tweet_content": "Reform UK’s dodgy Doncaster Mayoral Candidate",
        "created_at": "2025-04-25 20:57:37"
    },
    {
        "tweet_id": 1915881173630484590,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915881173630484590",
        "tweet_content": "Lincolnshire, you’ve been had.\n\n@andreajenkyns is celebrating being eligible as a candidate for Mayor of Lincolnshire today.\n\nOn a technicality.\n\nShe lives in a village near in Leeds. \n\nShe changed her address on the electoral roll twice, once to her campaign manager’s, then to a new one for the convenience of this election.\n\nAs she says, ‘voice of Yorkshire, will move if she wins’.\n\nHold her to that, as doubt she will.",
        "created_at": "2025-04-25 21:30:41"
    },
    {
        "tweet_id": 1915884370969432563,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915884370969432563",
        "tweet_content": "Keep those pom-poms rustling for crooked politics Polecat.\n\nShe found an address to register at, but doesn’t live in NK. That was her qualification, and she’s won on a technicality - that she managed to find an address to put on the form. Not to live in.\n\nLincolnshire has been had.",
        "created_at": "2025-04-25 21:43:24"
    },
    {
        "tweet_id": 1915899964489654493,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1915899964489654493",
        "tweet_content": "Hi Sean Matthews, Reform UK candidate for Tattershall Castle, #Lincolnshire and branch chair for Louth & Horncastle.\n\nDo you believe that:\n\n- Keir Starmer is in the pocket of Muslims?\n- He’s going to cause the Islamification of the UK?\n- Trans people are mentally ill?\n\nBecause we have a recording of you saying these things.",
        "created_at": "2025-04-25 22:45:21"
    },
    {
        "tweet_id": 1916126335090520115,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916126335090520115",
        "tweet_content": "James Defriend Reform UK candidate for Dover Town, Kent has some explaining to do.\n\nThere was a fire in Dover recently affecting a number of residents. So he’s announced that half of donations to his Reform council campaign are going to be donated to a charity appeal.\n\nThat’s attempting to bribe the electorate.\n\nAs described below, such an act should lead to the disqualification of candidates attempting to do this.",
        "created_at": "2025-04-26 13:44:52"
    },
    {
        "tweet_id": 1916126335090520115,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916126335090520115",
        "tweet_content": "James Defriend Reform UK candidate for Dover Town, Kent has some explaining to do.\n\nThere was a fire in Dover recently affecting a number of residents. So he’s announced that half of donations to his Reform council campaign are going to be donated to a charity appeal.\n\nThat’s attempting to bribe the electorate.\n\nAs described below, such an act should lead to the disqualification of candidates attempting to do this.",
        "created_at": "2025-04-26 13:44:52"
    },
    {
        "tweet_id": 1916126335090520115,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916126335090520115",
        "tweet_content": "James Defriend Reform UK candidate for Dover Town, Kent has some explaining to do.\n\nThere was a fire in Dover recently affecting a number of residents. So he’s announced that half of donations to his Reform council campaign are going to be donated to a charity appeal.\n\nThat’s attempting to bribe the electorate.\n\nAs described below, such an act should lead to the disqualification of candidates attempting to do this.",
        "created_at": "2025-04-26 13:44:52"
    },
    {
        "tweet_id": 1916133688892379368,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916133688892379368",
        "tweet_content": "Dodgy Peter Evans (@BscHons), Reform UK candidate for Sandwich division AND Thanet Villages, Thanet.\n\nThis image was recently reported to the police locally, but it’s an isolated incident, is it Peter?\n\nHe also once was forced to stand down from a planning committee as a councillor due to a massive conflict of interest after getting caught out.\n\nHas posted pretty much everything…",
        "created_at": "2025-04-26 14:14:06"
    },
    {
        "tweet_id": 1916133688892379368,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916133688892379368",
        "tweet_content": "Dodgy Peter Evans (@BscHons), Reform UK candidate for Sandwich division AND Thanet Villages, Thanet.\n\nThis image was recently reported to the police locally, but it’s an isolated incident, is it Peter?\n\nHe also once was forced to stand down from a planning committee as a councillor due to a massive conflict of interest after getting caught out.\n\nHas posted pretty much everything…",
        "created_at": "2025-04-26 14:14:06"
    },
    {
        "tweet_id": 1916133706898575492,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916133706898575492",
        "tweet_content": "He was a councillor once, and on Thanet planning committee. He quit after a secret video emerged of a meeting of the Save Manston Airport Association in which he sought advice from a US company RiverOak  about how to combat the plans being put forward by Stone Hill Park. \n\nAs planing committee chairman he would have had to remain impartial.\n\nDodgy Peter.\n\nhttps://t.co/NEvB9TTBzM",
        "created_at": "2025-04-26 14:14:10"
    },
    {
        "tweet_id": 1916133706898575492,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916133706898575492",
        "tweet_content": "He was a councillor once, and on Thanet planning committee. He quit after a secret video emerged of a meeting of the Save Manston Airport Association in which he sought advice from a US company RiverOak  about how to combat the plans being put forward by Stone Hill Park. \n\nAs planing committee chairman he would have had to remain impartial.\n\nDodgy Peter.\n\nhttps://t.co/NEvB9TTBzM",
        "created_at": "2025-04-26 14:14:10"
    },
    {
        "tweet_id": 1916201951349424512,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916201951349424512",
        "tweet_content": "Alan Amos, Reform UK’s candidate for Bedwardine, Worcestershire is a familiar name…\n\nHe’s a former Conservative MP, but then he decided to stand for Labour, but then went back to the Conservatives and became a councillor. Then he was an independent, now he’s chancing his luck with Reform.\n\nHe’s got some pretty interesting views…",
        "created_at": "2025-04-26 18:45:21"
    },
    {
        "tweet_id": 1916378078311305566,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916378078311305566",
        "tweet_content": "Robin Julian, Reform UK's candidate for Bideford West & Hartland, Devon is no stranger to running for council. He did it 3 times when he was a UKIP candidate and 4 times as an Independent. Now he's standing for Reform UK.\n\nHe was leader of UKIP in Devon, and the subject of an expose by hunt saboteurs, labelled a 'badger killer'...\n\nhttps://t.co/PfwMrnlNyH\n\nhttps://t.co/sZPmmOo3sZ",
        "created_at": "2025-04-27 06:25:13"
    },
    {
        "tweet_id": 1916378078311305566,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916378078311305566",
        "tweet_content": "Robin Julian, Reform UK's candidate for Bideford West & Hartland, Devon is no stranger to running for council. He did it 3 times when he was a UKIP candidate and 4 times as an Independent. Now he's standing for Reform UK.\n\nHe was leader of UKIP in Devon, and the subject of an expose by hunt saboteurs, labelled a 'badger killer'...\n\nhttps://t.co/PfwMrnlNyH\n\nhttps://t.co/sZPmmOo3sZ",
        "created_at": "2025-04-27 06:25:13"
    },
    {
        "tweet_id": 1916437458071286114,
        "author_id": 1466783923,
        "url": "https://x.com/TiceRichard/status/1916437458071286114",
        "tweet_content": "Lincolnshire Needs Reform. \n\nVote Reform UK on May 1st! 🇬🇧 https://t.co/7nvvN7YA4V",
        "created_at": "2025-04-27 10:21:10"
    },
    {
        "tweet_id": 1916459432558371050,
        "author_id": 1284185467160793088,
        "url": "https://x.com/TheGoodStatsMan/status/1916459432558371050",
        "tweet_content": "On Friday North Kesteven's Electoral Registration Officer was asked to rule on whether Reform Mayoral candidate Andre Jenkyns lived in Lincolnshire given that she had told the media she was living in Yorkshire.  This came about as the Independent candidate's team had asked North Kesteven whether she was living in Lincolnshire.  \nAs the relevant individuals did not attend to provide evidence on behalf of Reform the Officer stated: \"I do not make any determination that the subject was not entitled to be registered.  The only question to be decided by the Electoral Registration Officer is whether the subject was on the 24th February 2025, and is now, resident at the Address given.\"\nI understand that this means that, if Jenkyns is elected, a legal challenge can be launched on grounds of residency.  \nFollowing Friday's non-decision Reform Chairman Zia Yusuf tweeted as shown below...resulting in the Community Note shown.\nI think there are two important aspects to this.\n\n1 Local election rules are different.  The residency or connection requirement is there to stop political parties parachuting in preferred candidates from outside the area.  In this respect it feels Reform have broken the spirit of the law if not the letter of the law.\n2 One of the things many people have had enough of is spin and non-fact statements.  The Community Note is saying this was not a Tory attack.  As far as I can tell it has not yet failed.  The Lincolnshire Independents raised a valid question which has not yet been answered.",
        "created_at": "2025-04-27 11:48:29"
    },
    {
        "tweet_id": 1916459432558371050,
        "author_id": 1284185467160793088,
        "url": "https://x.com/TheGoodStatsMan/status/1916459432558371050",
        "tweet_content": "On Friday North Kesteven's Electoral Registration Officer was asked to rule on whether Reform Mayoral candidate Andre Jenkyns lived in Lincolnshire given that she had told the media she was living in Yorkshire.  This came about as the Independent candidate's team had asked North Kesteven whether she was living in Lincolnshire.  \nAs the relevant individuals did not attend to provide evidence on behalf of Reform the Officer stated: \"I do not make any determination that the subject was not entitled to be registered.  The only question to be decided by the Electoral Registration Officer is whether the subject was on the 24th February 2025, and is now, resident at the Address given.\"\nI understand that this means that, if Jenkyns is elected, a legal challenge can be launched on grounds of residency.  \nFollowing Friday's non-decision Reform Chairman Zia Yusuf tweeted as shown below...resulting in the Community Note shown.\nI think there are two important aspects to this.\n\n1 Local election rules are different.  The residency or connection requirement is there to stop political parties parachuting in preferred candidates from outside the area.  In this respect it feels Reform have broken the spirit of the law if not the letter of the law.\n2 One of the things many people have had enough of is spin and non-fact statements.  The Community Note is saying this was not a Tory attack.  As far as I can tell it has not yet failed.  The Lincolnshire Independents raised a valid question which has not yet been answered.",
        "created_at": "2025-04-27 11:48:29"
    },
    {
        "tweet_id": 1916518449997631774,
        "author_id": 19017675,
        "url": "https://x.com/Nigel_Farage/status/1916518449997631774",
        "tweet_content": "Iana Jacobson is standing for Reform in Shropshire on Thursday. \n\nShe has an amazing story to tell and will stand up for free speech in Britain today. https://t.co/0nbfa1IEyl",
        "created_at": "2025-04-27 15:43:00"
    },
    {
        "tweet_id": 1916530559435608351,
        "author_id": 437814330,
        "url": "https://x.com/IsabelOakeshott/status/1916530559435608351",
        "tweet_content": "REALITY CHECK. Runcorn &amp; Helsby is one of Labour's safest seats. Yes, @reformparty_uk is on a roll, but @UKLabour is working very hard. All to play for, but for @Nigel_Farage there would be no shame in not winning this one...",
        "created_at": "2025-04-27 16:31:07"
    },
    {
        "tweet_id": 1916530559435608351,
        "author_id": 437814330,
        "url": "https://x.com/IsabelOakeshott/status/1916530559435608351",
        "tweet_content": "REALITY CHECK. Runcorn &amp; Helsby is one of Labour's safest seats. Yes, @reformparty_uk is on a roll, but @UKLabour is working very hard. All to play for, but for @Nigel_Farage there would be no shame in not winning this one...",
        "created_at": "2025-04-27 16:31:07"
    },
    {
        "tweet_id": 1916534064921694240,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916534064921694240",
        "tweet_content": "The man at the start of this video Sean Matthews is the campaign that let 2x convicted charity fraudster Dan Turner still stand despite knowing about his imminent trial. Just months ago.\n\nHe also believes:\n- Keir Starmer is in the pocket of Muslims\n- He’s going to cause the Islamification of the UK\n- Trans people are mentally ill\n\nLincolnshire needs to not vote for him.",
        "created_at": "2025-04-27 16:45:03"
    },
    {
        "tweet_id": 1916534114108293158,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916534114108293158",
        "tweet_content": "The man at the start of this video Sean Matthews is the campaign that let 2x convicted charity fraudster Dan Turner still stand despite knowing about his imminent trial. Just months ago.\n\nHe also believes:\n- Keir Starmer is in the pocket of Muslims\n- He’s going to cause the Islamification of the UK\n- Trans people are mentally ill\n\nLincolnshire needs to not vote for him.",
        "created_at": "2025-04-27 16:45:14"
    },
    {
        "tweet_id": 1916541602803093840,
        "author_id": 19017675,
        "url": "https://x.com/Nigel_Farage/status/1916541602803093840",
        "tweet_content": "Stiliyan Petrov is an electrical apprentice who is standing for Reform in Warwickshire on Thursday.\n\nHe wants to give a voice back to people who feel ignored by politics. https://t.co/P0qmsxTFNr",
        "created_at": "2025-04-27 17:15:00"
    },
    {
        "tweet_id": 1916550617482359185,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916550617482359185",
        "tweet_content": "More on Ryan Coogan the Reform UK Mayoral candidate for Peterborough &amp; Cambridge.\n\nSeems he’s been blocking people for asking for detail on his claim that he was responsible for the solution to MRSA. https://t.co/QWXOoNSWtl",
        "created_at": "2025-04-27 17:50:49"
    },
    {
        "tweet_id": 1916779536080838756,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916779536080838756",
        "tweet_content": "Jeremy Richard Ruse, Reform UK candidate for Ashbourne South, Derbyshire shared the same image as Joel Tetlow who was recently featured in this news article:\n\nhttps://t.co/vW1ABBckWy\n\n@reformparty_uk time to take action on BOTH.",
        "created_at": "2025-04-28 09:00:28"
    },
    {
        "tweet_id": 1916903726524014971,
        "author_id": 1434450096557596680,
        "url": "https://x.com/PolitlcsUK/status/1916903726524014971",
        "tweet_content": "🚨 NEW: Harry Cole, the political editor of The Sun, has announced he is moving to Washington DC to be the paper's new Editor-at-Large https://t.co/pmbdOB2Rki",
        "created_at": "2025-04-28 17:13:57"
    },
    {
        "tweet_id": 1916963650469835148,
        "author_id": 2863775537,
        "url": "https://x.com/greg_herriett/status/1916963650469835148",
        "tweet_content": "@reformparty_uk candidate in Carshalton South and Clockhouse is a full on Tommy Robinson fan and frequently uses vile language about Muslims.",
        "created_at": "2025-04-28 21:12:04"
    },
    {
        "tweet_id": 1916966965777760267,
        "author_id": 806461716372615168,
        "url": "https://x.com/LukeTryl/status/1916966965777760267",
        "tweet_content": "We are just in the car back from focus groups this weekend in Beverley, Hull,Scunthorpe &amp; Peterborough and without doubt the disillusionment was the worst I’ve heard, in every group it was anger; despondency or misery about the state of Britain that doesn’t feel sustainable. https://t.co/67FQhUmhJs",
        "created_at": "2025-04-28 21:25:14"
    },
    {
        "tweet_id": 1916968575509659962,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1916968575509659962",
        "tweet_content": "Hi @Nigel_Farage, you were campaigning in Leicestershire today.\n\nThe guy marked here is Elliott Allman. Did you know he once posted on social media calling someone a “black cunt”? \n\nTurns out @reformparty_uk are fine with that sort of thing. https://t.co/1vefigbAAp",
        "created_at": "2025-04-28 21:31:38"
    },
    {
        "tweet_id": 1917138173202759702,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917138173202759702",
        "tweet_content": "After the 2015 election UKIP, under @Nigel_Farage had 496 councillors and ended up in control of Thanet District Council.\n\nThat's the benchmark for this Thursday.",
        "created_at": "2025-04-29 08:45:33"
    },
    {
        "tweet_id": 1917162993617338601,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917162993617338601",
        "tweet_content": "We're not saying Simon Collins, Reform UK candidate for Barton &amp; Tredworth, Gloucestershire is gullable, but he's left a review on a scam Facebook account for a porn star... https://t.co/0VOrGpqNqE",
        "created_at": "2025-04-29 10:24:11"
    },
    {
        "tweet_id": 1917176690368979386,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917176690368979386",
        "tweet_content": "\"Speaking a foreign language\" is the operative phrase in this.\n\nTurns out in Mark G Simpson's world, only foreign young men hang around in groups and litter. No solution offered, just blame on people speaking a foreign language.\n\nThis is a Reform UK parliamentary candidate and regional organiser for Bexley, Bromley, Greenwich & Lewisham",
        "created_at": "2025-04-29 11:18:37"
    },
    {
        "tweet_id": 1917176690368979386,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917176690368979386",
        "tweet_content": "\"Speaking a foreign language\" is the operative phrase in this.\n\nTurns out in Mark G Simpson's world, only foreign young men hang around in groups and litter. No solution offered, just blame on people speaking a foreign language.\n\nThis is a Reform UK parliamentary candidate and regional organiser for Bexley, Bromley, Greenwich & Lewisham",
        "created_at": "2025-04-29 11:18:37"
    },
    {
        "tweet_id": 1917217370504118753,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917217370504118753",
        "tweet_content": "Far-right racism, conspiracy theorists and Andrew Tate fans\n\nReform UK's North West Leicestershire branch is a hotbed of 'hate' – here's the proof.\n\nhttps://t.co/onEqbNmOfg",
        "created_at": "2025-04-29 14:00:15"
    },
    {
        "tweet_id": 1917217370504118753,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917217370504118753",
        "tweet_content": "Far-right racism, conspiracy theorists and Andrew Tate fans\n\nReform UK's North West Leicestershire branch is a hotbed of 'hate' – here's the proof.\n\nhttps://t.co/onEqbNmOfg",
        "created_at": "2025-04-29 14:00:15"
    },
    {
        "tweet_id": 1917253142707609778,
        "author_id": 1904136269816283136,
        "url": "https://x.com/SarahForRuncorn/status/1917253142707609778",
        "tweet_content": "Vote for Reform UK on Thursday to bring real change to Runcorn &amp; Helsby. 🇬🇧",
        "created_at": "2025-04-29 16:22:24"
    },
    {
        "tweet_id": 1917272760234955136,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917272760234955136",
        "tweet_content": "Reform UK’s rising star @Joseph_Boam hates his nickname Baby Boam.\n\nJust found this photo of him when he was out flying the flag for the Conservatives when he was even Babier Boam. He’s gonna hate it.\n\nHe’s Chairman of North West Leicestershire @ReformParty_UK Branch and candidate for Whitwick.\n\nToday he was slammed by local press for his lack of action over multiple scandals in his patch: \n\nhttps://t.co/HRC023ki6t",
        "created_at": "2025-04-29 17:40:21"
    },
    {
        "tweet_id": 1917272760234955136,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917272760234955136",
        "tweet_content": "Reform UK’s rising star @Joseph_Boam hates his nickname Baby Boam.\n\nJust found this photo of him when he was out flying the flag for the Conservatives when he was even Babier Boam. He’s gonna hate it.\n\nHe’s Chairman of North West Leicestershire @ReformParty_UK Branch and candidate for Whitwick.\n\nToday he was slammed by local press for his lack of action over multiple scandals in his patch: \n\nhttps://t.co/HRC023ki6t",
        "created_at": "2025-04-29 17:40:21"
    },
    {
        "tweet_id": 1917305156821282855,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917305156821282855",
        "tweet_content": "Thomas Manning, Reform UK candidate for #Talavera in the West #Northamptonshire\n\nhttps://t.co/ikaHN01zPF",
        "created_at": "2025-04-29 19:49:05"
    },
    {
        "tweet_id": 1917504057159147834,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917504057159147834",
        "tweet_content": "Hi Frank Austin (@frankau82186242) as agent for John Falkenstein, Reform UK candidate for North #Tyneside Mayor, do you and he condone the Southport Riots? https://t.co/HXX7Oz3VF1",
        "created_at": "2025-04-30 08:59:27"
    },
    {
        "tweet_id": 1917509270779879873,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917509270779879873",
        "tweet_content": "Mary Lawes (@Mary_Lawes), Reform UK candidate for #Folkestone East, Kent \n\nIs it really the @reformparty_uk view that immigrants are being brought in to the UK to break down our society as part of the WEF's 'Great Reset'?\n\nShe thinks we should give immigrants digital ID, but not the British.\n\n@ReformUKKent care to make a statement?",
        "created_at": "2025-04-30 09:20:10"
    },
    {
        "tweet_id": 1917547838227034576,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917547838227034576",
        "tweet_content": "🚨 Confirmed: Andrea Jenkyns fiddled the forms 🚨 \n\nAndrea Jenkyns, the Reform UK candidate for #Lincolnshire Mayor’s eligibility seems to be based on an 11th hour rent payment, after multiple address changes.\n\nHer actions will set the tone for her Mayoralty should she win.\n\nThe hearing to determine whether or not the Reform UK candidate for Mayor of Lincolnshire was eligible to be on the North Kesteven electoral roll (and therefore eligible to be on the ballot paper) took place last Friday.\n\nIt was requested that the complainants present the case that Andrea Jenkyns did not live in Lincolnshire on the date she registered. \n\nThe ONLY evidence presented that 'proved' her residence was a written statement from a landlady, to whom she has paid £2.5k rent up front.\n\nPrior to this she registered at the Reform Party Chairman’s house - Sean Matthews. So it’s obvious she was shopping around for somewhere to claim to be living…\n\nShe lives in Yorkshire, but has thrown money at the problem and rented somewhere to make it go away…\n\nThe hearing does not rule out an appeal or a police investigation in to the way she’s approached this.\n\nIf she wins tomorrow, it will hang over her Mayoralty.",
        "created_at": "2025-04-30 11:53:25"
    },
    {
        "tweet_id": 1917547838227034576,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917547838227034576",
        "tweet_content": "🚨 Confirmed: Andrea Jenkyns fiddled the forms 🚨 \n\nAndrea Jenkyns, the Reform UK candidate for #Lincolnshire Mayor’s eligibility seems to be based on an 11th hour rent payment, after multiple address changes.\n\nHer actions will set the tone for her Mayoralty should she win.\n\nThe hearing to determine whether or not the Reform UK candidate for Mayor of Lincolnshire was eligible to be on the North Kesteven electoral roll (and therefore eligible to be on the ballot paper) took place last Friday.\n\nIt was requested that the complainants present the case that Andrea Jenkyns did not live in Lincolnshire on the date she registered. \n\nThe ONLY evidence presented that 'proved' her residence was a written statement from a landlady, to whom she has paid £2.5k rent up front.\n\nPrior to this she registered at the Reform Party Chairman’s house - Sean Matthews. So it’s obvious she was shopping around for somewhere to claim to be living…\n\nShe lives in Yorkshire, but has thrown money at the problem and rented somewhere to make it go away…\n\nThe hearing does not rule out an appeal or a police investigation in to the way she’s approached this.\n\nIf she wins tomorrow, it will hang over her Mayoralty.",
        "created_at": "2025-04-30 11:53:25"
    },
    {
        "tweet_id": 1917572145208778877,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917572145208778877",
        "tweet_content": "A whole slew of new exposes by Hope Not Hate:\n\nReform UK’s Northumberland Ne’er-do-wells\n\nhttps://t.co/C80hx6soRb",
        "created_at": "2025-04-30 13:30:00"
    },
    {
        "tweet_id": 1917574288787284172,
        "author_id": 1318935853,
        "url": "https://x.com/McivorJaymey/status/1917574288787284172",
        "tweet_content": "So sad to talk to people in #Ongar who don’t even realise elections in Essex are cancelled tomorrow.\n\nBUT they are going ahead next door in Kent, Hertfordshire &amp; Cambridgeshire!\n\nSO get on the phone to everyone you know and tell them to VOTE REFORM 🇬🇧 \n\nLet’s 🇬🇧 Save 🇬🇧 Britain🇬🇧 https://t.co/2927TgYw4Y",
        "created_at": "2025-04-30 13:38:31"
    },
    {
        "tweet_id": 1917574288787284172,
        "author_id": 1318935853,
        "url": "https://x.com/McivorJaymey/status/1917574288787284172",
        "tweet_content": "So sad to talk to people in #Ongar who don’t even realise elections in Essex are cancelled tomorrow.\n\nBUT they are going ahead next door in Kent, Hertfordshire &amp; Cambridgeshire!\n\nSO get on the phone to everyone you know and tell them to VOTE REFORM 🇬🇧 \n\nLet’s 🇬🇧 Save 🇬🇧 Britain🇬🇧 https://t.co/2927TgYw4Y",
        "created_at": "2025-04-30 13:38:31"
    },
    {
        "tweet_id": 1917609475332268404,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917609475332268404",
        "tweet_content": "What’s @Nigel_Farage’s record like when his party actually got power after local elections? \n\nTerrible.\n\nUKIP once controlled Thanet District Council and you guessed it, they created a huge mess.\n\nThey did very little because they didn’t realise local politics is about getting things done, not slogans and divisive politics. It’s about collaboration.\n\nEventually they fell apart.\n\nThen Nigel left.",
        "created_at": "2025-04-30 15:58:21"
    },
    {
        "tweet_id": 1917633304657830168,
        "author_id": 1094881364887986177,
        "url": "https://x.com/reformparty_uk/status/1917633304657830168",
        "tweet_content": "Nigel Farage is speaking LIVE from Staffordshire ahead of polling day tomorrow. https://t.co/6gxPVu6rY8",
        "created_at": "2025-04-30 17:33:02"
    },
    {
        "tweet_id": 1917633675455324527,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917633675455324527",
        "tweet_content": "Leicestershire leaders condemn Reform's 'dog whistle' tactics\n\nhttps://t.co/0oYHpmWn6b",
        "created_at": "2025-04-30 17:34:30"
    },
    {
        "tweet_id": 1917634437875130711,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917634437875130711",
        "tweet_content": "Who remembers Nat Vanstone, the Reform UK candidate who posted on Twitter at ‘Free Fuck Finder’ looking for sex? \n\nHe’s standing again tomorrow in #Broadclyst, #Devon\n\nIf you’re looking for a man of integrity as your councillor, he ain’t your guy as he was well into his current relationship when he posted this call out to ‘Free Fuck Finder’ in Devon for girls in the area.",
        "created_at": "2025-04-30 17:37:32"
    },
    {
        "tweet_id": 1917824931053584581,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917824931053584581",
        "tweet_content": "And by fresh change, Reform UK’s Alexander Jones, their candidate for Doncaster Mayor means you could vote in a ‘dodgy Forex salesman’.\n\nWonder why he closed down all his social for his company Witness Invest…\n\nGot something to hide?\n\nhttps://t.co/Fd4JB8K4pj",
        "created_at": "2025-05-01 06:14:29"
    },
    {
        "tweet_id": 1917831823465292134,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1917831823465292134",
        "tweet_content": "Exposing racist candidates works:\n\nReform pulls proposed south Essex by-election candidate as 'BNP links' revealed \n\nhttps://t.co/Ngvx9LCV31",
        "created_at": "2025-05-01 06:41:52"
    },
    {
        "tweet_id": 1917874548663349534,
        "author_id": 1466783923,
        "url": "https://x.com/TiceRichard/status/1917874548663349534",
        "tweet_content": "Election Day\n\nRuncorn &amp; Helsby by election too close to call - every vote counts\n\nVote Sarah Pochin  ⁦@reformparty_uk⁩ https://t.co/6mWBU40lkZ",
        "created_at": "2025-05-01 09:31:39"
    },
    {
        "tweet_id": 1917874548663349534,
        "author_id": 1466783923,
        "url": "https://x.com/TiceRichard/status/1917874548663349534",
        "tweet_content": "Election Day\n\nRuncorn &amp; Helsby by election too close to call - every vote counts\n\nVote Sarah Pochin  ⁦@reformparty_uk⁩ https://t.co/6mWBU40lkZ",
        "created_at": "2025-05-01 09:31:39"
    },
    {
        "tweet_id": 1918144545214132676,
        "author_id": 622222702,
        "url": "https://x.com/crh1987/status/1918144545214132676",
        "tweet_content": "Good morning everyone. I have just returned home from the South Staffordshire count, and can confirm I have been elected to Staffordshire County Council representing Penkridge division. The hard work starts now.",
        "created_at": "2025-05-02 03:24:31"
    },
    {
        "tweet_id": 1918144545214132676,
        "author_id": 622222702,
        "url": "https://x.com/crh1987/status/1918144545214132676",
        "tweet_content": "Good morning everyone. I have just returned home from the South Staffordshire count, and can confirm I have been elected to Staffordshire County Council representing Penkridge division. The hard work starts now.",
        "created_at": "2025-05-02 03:24:31"
    },
    {
        "tweet_id": 1918144545214132676,
        "author_id": 622222702,
        "url": "https://x.com/crh1987/status/1918144545214132676",
        "tweet_content": "Good morning everyone. I have just returned home from the South Staffordshire count, and can confirm I have been elected to Staffordshire County Council representing Penkridge division. The hard work starts now.",
        "created_at": "2025-05-02 03:24:31"
    },
    {
        "tweet_id": 1918169089182142625,
        "author_id": 1434450096557596680,
        "url": "https://x.com/PolitlcsUK/status/1918169089182142625",
        "tweet_content": "🚨 BREAKING: Reform UK WINS the Runcorn and Helsby by-election from Labour\n\n🟣 REF: 12,645 (+4,983)\n🔴 LAB: 12,639 (-9,719)\n🔵 CON: 2,341 (-4,415)\n🟢 GRN: 2,314 (-401)\n🟠 LDEM: 942 (-1,207)\n\nChanges w/ 2024",
        "created_at": "2025-05-02 05:02:03"
    },
    {
        "tweet_id": 1918169089182142625,
        "author_id": 1434450096557596680,
        "url": "https://x.com/PolitlcsUK/status/1918169089182142625",
        "tweet_content": "🚨 BREAKING: Reform UK WINS the Runcorn and Helsby by-election from Labour\n\n🟣 REF: 12,645 (+4,983)\n🔴 LAB: 12,639 (-9,719)\n🔵 CON: 2,341 (-4,415)\n🟢 GRN: 2,314 (-401)\n🟠 LDEM: 942 (-1,207)\n\nChanges w/ 2024",
        "created_at": "2025-05-02 05:02:03"
    },
    {
        "tweet_id": 1918172625953579192,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918172625953579192",
        "tweet_content": "Reform UK win Runcorn by 6 votes (that makes 2 out of their 5 MPs winners by less than 10 votes).\n\nWonder if @SarahForRuncorn will now explain her u-turn on supporting Winter Fuel Allowance cuts:\n\nhttps://t.co/0s2ZEj5HFa",
        "created_at": "2025-05-02 05:16:06"
    },
    {
        "tweet_id": 1918190721523175769,
        "author_id": 1434450096557596680,
        "url": "https://x.com/PolitlcsUK/status/1918190721523175769",
        "tweet_content": "🚨🎥 WATCH: Reform’s Lincolnshire Mayor Andrea Jenkyns says that illegal migrants ‘should be put in tents’ \n\nJenkyns also pushed a Sky reporters’ microphone away after being asked about comments she made regarding another candidates’ South African accent\n\n[@serenabarksing] https://t.co/dS5KYfhIv5",
        "created_at": "2025-05-02 06:28:00"
    },
    {
        "tweet_id": 1918193041006805397,
        "author_id": 89513817,
        "url": "https://x.com/TomSheldrickITV/status/1918193041006805397",
        "tweet_content": "I questioned Arty Hume - the new Reform UK councillor in Amble - about reports he has praised Tommy Robinson &amp; Andrew Tate in social media posts previously\n\nA Reform colleague in Northumberland said: \"it's not my decision\" if Cllr Hume is part of the Reform group on the council https://t.co/LLBqGZLhUl",
        "created_at": "2025-05-02 06:37:13"
    },
    {
        "tweet_id": 1918232317476434060,
        "author_id": 4187168613,
        "url": "https://x.com/DavidBurton1971/status/1918232317476434060",
        "tweet_content": "“…David Bick was elected to County Hall after he comfortably triumphed in the Thetford West division…” \n\nWell played Bicky. Old school City PR taking over!! \n\nIn fact, in @Nigel_Farage THE city just taking over full stop!\n\nUp the @reformparty_uk 🤩\n\nhttps://t.co/yoUensLRU6",
        "created_at": "2025-05-02 09:13:18"
    },
    {
        "tweet_id": 1918540738045870247,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918540738045870247",
        "tweet_content": "Wayne Titley, newly elected Reform UK councillor for Eccleshall & Gnosall, Staffordshire\n\nReform UK’s claims to have vetted candidates is about to bite them.\n\nIt’s not just his wish to ‘get the navy to machine gun small boats and sink them’. Yes, he’s now a councillor.\n\nRemember him @TiceRichard?",
        "created_at": "2025-05-03 05:38:51"
    },
    {
        "tweet_id": 1918540762163077292,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918540762163077292",
        "tweet_content": "Reform UK’s new councillor will now have to manage budgets, advocate for people (even ones not like him), and really look in to detail.\n\nYeah, the same new councillor that thinks if you post a chain meme, your Facebook ads will stop.\n\nGood luck Staffordshire https://t.co/UD4FBjq3eN",
        "created_at": "2025-05-03 05:38:57"
    },
    {
        "tweet_id": 1918607477031002205,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918607477031002205",
        "tweet_content": "Well done #Scarborough, you voted in Gaye Hird as a councillor for Falsgrave &amp; Stepney Ward.\n\nShe loves spreading conspiracy theories about sky spraying and Muslims.\n\nA Reform UK councillor. Let that sink in. https://t.co/BE1DjpxyEa",
        "created_at": "2025-05-03 10:04:03"
    },
    {
        "tweet_id": 1918682647565385740,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918682647565385740",
        "tweet_content": "In Lincolnshire Reform UK are having a big squabble on who is going to be leader of the council.\n\nApparently it’s a 3 way contest with no real rules on how they will be decided.",
        "created_at": "2025-05-03 15:02:45"
    },
    {
        "tweet_id": 1918729012936942010,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918729012936942010",
        "tweet_content": "Ivan Dabbs, new Reform UK councillor. Didn’t show up to the count and no one seems to know who he is.\n\nMystery.\n\nThere was a photo of each winner on the West Northamptonshire council Twitter account, apart from his. https://t.co/LLhPBDiaJe",
        "created_at": "2025-05-03 18:06:59"
    },
    {
        "tweet_id": 1918895652584423802,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918895652584423802",
        "tweet_content": "Ronald James Firman (@ReformRonald) Reform UK’s new councillor for Hunsbury, West Northamptonshire.\n\n@reformparry_uk are fine with candidates that make KKK jokes about #GRENFELL. Absolutely boggles the mind that their now councillor got a ‘warning’ after being exposed.\n\nHere’s some more of his posts including racism, misogyny and and anti-Muslim hate.\n\nhttps://t.co/K4WZWgJGSG",
        "created_at": "2025-05-04 05:09:09"
    },
    {
        "tweet_id": 1918924394614685824,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918924394614685824",
        "tweet_content": "Ivan Dabbs (@ipdabbs99) Reform UK’s new councillor for Deanshanger & Paulerspury, West Northamptonshire.\n\nHe confirmed yesterday this was his account. What a bile factory his Twitter is.\n\n@reformparty_uk, he’s a very obvious Britain First supporter, having promoted their content and commented supporting it multiple times.",
        "created_at": "2025-05-04 07:03:22"
    },
    {
        "tweet_id": 1918959533629526414,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1918959533629526414",
        "tweet_content": "Well done (slow clap) County #Durham's Bishop Auckland, you voted in Lyndsey Fox as your Reform UK councillor.\n\nShe was a Conservative Councillor for Spennymoor Town Council but was kicked out of her position last year for non attendance:\n\nhttps://t.co/ujUkKd8pQo\n\nNow she's vying to be Council Leader.\n\nYou cannot make it up.",
        "created_at": "2025-05-04 09:23:00"
    },
    {
        "tweet_id": 1919043629273805117,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919043629273805117",
        "tweet_content": "Reform UK have a new councillor on Robin Julian, Bideford West &amp; Hartland, Devon.\n\nUKIP’s, sorry, Reform’s very own ‘Badger Killer’.",
        "created_at": "2025-05-04 14:57:09"
    },
    {
        "tweet_id": 1919106462300704820,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919106462300704820",
        "tweet_content": "Day 1 in the job and @andreajenkyns has abused someone on Twitter and breached data protection doing so.\n\nMayor Damewit\n\nWonder if she’s bothered to move to Lincolnshire yet. https://t.co/kEvpTP2GgD",
        "created_at": "2025-05-04 19:06:50"
    },
    {
        "tweet_id": 1919382176895746329,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919382176895746329",
        "tweet_content": "Shame Reform UK are banning flying the Armed Forces flag from flying on Lancashire county council buildings.\n\nOh wait, that’s you! https://t.co/VFimWP1JD7",
        "created_at": "2025-05-05 13:22:26"
    },
    {
        "tweet_id": 1919443161593589900,
        "author_id": 1318935853,
        "url": "https://x.com/McivorJaymey/status/1919443161593589900",
        "tweet_content": "Ohhhhh I just can’t wait for this 🇬🇧 \n\nEssex Needs Reform (it’s going to get it) 🇬🇧",
        "created_at": "2025-05-05 17:24:45"
    },
    {
        "tweet_id": 1919459223190012342,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919459223190012342",
        "tweet_content": "@DickyWoodbine Since at least 2023, here’s a post about it from Lancashire county council. https://t.co/UAHP903Yg0",
        "created_at": "2025-05-05 18:28:35"
    },
    {
        "tweet_id": 1919459440509468949,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919459440509468949",
        "tweet_content": "Here’s a post about it by Lancashire county council. https://t.co/wTF1UwdDz7",
        "created_at": "2025-05-05 18:29:27"
    },
    {
        "tweet_id": 1919461015063867714,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919461015063867714",
        "tweet_content": "Reform UK will ban Lancashire County Council from flying the @ArmedForcesDay flag this June under new rules. https://t.co/fW6liUFa04",
        "created_at": "2025-05-05 18:35:42"
    },
    {
        "tweet_id": 1919504956488323562,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919504956488323562",
        "tweet_content": "Got to worry when Dave Atherton leaps to your defence.\n\nHe’s asking ‘What do we have against open discussion?’\n\nHe just unblocked our account to post this, after he blocked it about a year ago because he got all salty about something.",
        "created_at": "2025-05-05 21:30:18"
    },
    {
        "tweet_id": 1919635413431419004,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919635413431419004",
        "tweet_content": "Linden Kemkaran is Reform UK’s new councillor for #Maidstone South East & a contender to be their leader on @Kent_cc.\n\nShe’s the former Conservative candidate for Bradford that RT’d a post stating Muslims have a ‘nasty’ culture & 3rd world ways. \n\nShe also once stated that comments made against Tories are akin to racist and homophobic slurs.\n\nShe’s also a BBC journalist @lindenkemkaran.\n\nhttps://t.co/Nqn3PjKZTv",
        "created_at": "2025-05-06 06:08:42"
    },
    {
        "tweet_id": 1919721106170081765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919721106170081765",
        "tweet_content": "Reform UK's new councillor for #Blythe is Barry Elliott.\n\nThere's quite a lot to be concerned about with him. Like this note going around local Facebook about him conning pensioners.\n\nHe was a UKIP councillor, and was investigated by them after sharing a BNP cartoon: https://t.co/TNYAdUQYaF\n\nThen there's Blyth Football Club:\n\nBlyth AFC days from going out of existence as owner Barry Elliott reveals club is unsustainable: https://t.co/1JokdaPb7D\n\nThough as Blyth residents will tell you, it was he who made it a mess:\nhttps://t.co/QSdNCDlvUJ\n\nAnd concerning housing development issues:\n\nFormer UKIP councillor told he MUST build a seawall as Blyth luxury houses row rumbles on: https://t.co/c71lDfCEBP\n\nWork stopped at Blyth housing development due to planning breaches: https://t.co/lpEQHHgfRR\n\nSo another one to add to @reformparty_uk's list to look at.",
        "created_at": "2025-05-06 11:49:13"
    },
    {
        "tweet_id": 1919721106170081765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919721106170081765",
        "tweet_content": "Reform UK's new councillor for #Blythe is Barry Elliott.\n\nThere's quite a lot to be concerned about with him. Like this note going around local Facebook about him conning pensioners.\n\nHe was a UKIP councillor, and was investigated by them after sharing a BNP cartoon: https://t.co/TNYAdUQYaF\n\nThen there's Blyth Football Club:\n\nBlyth AFC days from going out of existence as owner Barry Elliott reveals club is unsustainable: https://t.co/1JokdaPb7D\n\nThough as Blyth residents will tell you, it was he who made it a mess:\nhttps://t.co/QSdNCDlvUJ\n\nAnd concerning housing development issues:\n\nFormer UKIP councillor told he MUST build a seawall as Blyth luxury houses row rumbles on: https://t.co/c71lDfCEBP\n\nWork stopped at Blyth housing development due to planning breaches: https://t.co/lpEQHHgfRR\n\nSo another one to add to @reformparty_uk's list to look at.",
        "created_at": "2025-05-06 11:49:13"
    },
    {
        "tweet_id": 1919721106170081765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919721106170081765",
        "tweet_content": "Reform UK's new councillor for #Blythe is Barry Elliott.\n\nThere's quite a lot to be concerned about with him. Like this note going around local Facebook about him conning pensioners.\n\nHe was a UKIP councillor, and was investigated by them after sharing a BNP cartoon: https://t.co/TNYAdUQYaF\n\nThen there's Blyth Football Club:\n\nBlyth AFC days from going out of existence as owner Barry Elliott reveals club is unsustainable: https://t.co/1JokdaPb7D\n\nThough as Blyth residents will tell you, it was he who made it a mess:\nhttps://t.co/QSdNCDlvUJ\n\nAnd concerning housing development issues:\n\nFormer UKIP councillor told he MUST build a seawall as Blyth luxury houses row rumbles on: https://t.co/c71lDfCEBP\n\nWork stopped at Blyth housing development due to planning breaches: https://t.co/lpEQHHgfRR\n\nSo another one to add to @reformparty_uk's list to look at.",
        "created_at": "2025-05-06 11:49:13"
    },
    {
        "tweet_id": 1919721106170081765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919721106170081765",
        "tweet_content": "Reform UK's new councillor for #Blythe is Barry Elliott.\n\nThere's quite a lot to be concerned about with him. Like this note going around local Facebook about him conning pensioners.\n\nHe was a UKIP councillor, and was investigated by them after sharing a BNP cartoon: https://t.co/TNYAdUQYaF\n\nThen there's Blyth Football Club:\n\nBlyth AFC days from going out of existence as owner Barry Elliott reveals club is unsustainable: https://t.co/1JokdaPb7D\n\nThough as Blyth residents will tell you, it was he who made it a mess:\nhttps://t.co/QSdNCDlvUJ\n\nAnd concerning housing development issues:\n\nFormer UKIP councillor told he MUST build a seawall as Blyth luxury houses row rumbles on: https://t.co/c71lDfCEBP\n\nWork stopped at Blyth housing development due to planning breaches: https://t.co/lpEQHHgfRR\n\nSo another one to add to @reformparty_uk's list to look at.",
        "created_at": "2025-05-06 11:49:13"
    },
    {
        "tweet_id": 1919721106170081765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1919721106170081765",
        "tweet_content": "Reform UK's new councillor for #Blythe is Barry Elliott.\n\nThere's quite a lot to be concerned about with him. Like this note going around local Facebook about him conning pensioners.\n\nHe was a UKIP councillor, and was investigated by them after sharing a BNP cartoon: https://t.co/TNYAdUQYaF\n\nThen there's Blyth Football Club:\n\nBlyth AFC days from going out of existence as owner Barry Elliott reveals club is unsustainable: https://t.co/1JokdaPb7D\n\nThough as Blyth residents will tell you, it was he who made it a mess:\nhttps://t.co/QSdNCDlvUJ\n\nAnd concerning housing development issues:\n\nFormer UKIP councillor told he MUST build a seawall as Blyth luxury houses row rumbles on: https://t.co/c71lDfCEBP\n\nWork stopped at Blyth housing development due to planning breaches: https://t.co/lpEQHHgfRR\n\nSo another one to add to @reformparty_uk's list to look at.",
        "created_at": "2025-05-06 11:49:13"
    },
    {
        "tweet_id": 1920029701344461091,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920029701344461091",
        "tweet_content": "Dave Ellis, Reform UK's candidate for Newquay Trenance is lying to call the election result in to question.\n\nThere were 2 re-counts for #Newquay Trenance and he lost by 7 votes.\n\n@reformparty_uk please tell your candidate to stop propagating lies. https://t.co/gARl8BajM1",
        "created_at": "2025-05-07 08:15:27"
    },
    {
        "tweet_id": 1920032317503840528,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920032317503840528",
        "tweet_content": "Former Sandwell Conservative Councillor and Sandwell Conservative Chairman Jay Anandou has hijacked the Sandwell Conservatives Facebook account and has rebranded it as Reform UK. https://t.co/nRoNZlZjrZ",
        "created_at": "2025-05-07 08:25:51"
    },
    {
        "tweet_id": 1920032317503840528,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920032317503840528",
        "tweet_content": "Former Sandwell Conservative Councillor and Sandwell Conservative Chairman Jay Anandou has hijacked the Sandwell Conservatives Facebook account and has rebranded it as Reform UK. https://t.co/nRoNZlZjrZ",
        "created_at": "2025-05-07 08:25:51"
    },
    {
        "tweet_id": 1920032317503840528,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920032317503840528",
        "tweet_content": "Former Sandwell Conservative Councillor and Sandwell Conservative Chairman Jay Anandou has hijacked the Sandwell Conservatives Facebook account and has rebranded it as Reform UK. https://t.co/nRoNZlZjrZ",
        "created_at": "2025-05-07 08:25:51"
    },
    {
        "tweet_id": 1920039216941031703,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920039216941031703",
        "tweet_content": "Steve Horner is Reform UK's new councillor in #Teignmouth West in #Teignbridge.\n\nHe's known online as 'The Defiant Englishman'.\n\nHere he is promoting:\n\n➡️The Great Replacement Theory\n➡️Tommy Robinson\n➡️The Far-Right March\n\n@teignbridge council are going to have to monitor him as these would breach the councillor code of conduct.",
        "created_at": "2025-05-07 08:53:16"
    },
    {
        "tweet_id": 1920062814292529623,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920062814292529623",
        "tweet_content": "Reform UK's new Mayor for Greater Lincolnshire @andreajenkyns invited James Kirby to her swearing in event: https://t.co/onFyu5DbrI\n\nJust a couple of days before he tweeted about mass deportations to Tommy Robinson.\n\nHe's the guy we posted about you visiting the pub of in February. The guy who calls Sadiq Khan, the Mayor of London an 'infiltrator'.\n\nThat's the company @reformparty_uk's new mayor keeps.",
        "created_at": "2025-05-07 10:27:02"
    },
    {
        "tweet_id": 1920399593432342816,
        "author_id": 353142761,
        "url": "https://x.com/jamiewaller2/status/1920399593432342816",
        "tweet_content": "Reform's Sean Matthews has been named the new leader of Lincolnshire County Council - seen here celebrating with Richard Tice and Andrea Jenkyns https://t.co/NG15K46ImS",
        "created_at": "2025-05-08 08:45:17"
    },
    {
        "tweet_id": 1920411123989221595,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920411123989221595",
        "tweet_content": "Reform UK control Derbyshire County Council, but what did they say they are going to do?\n\nTL;DR\n\nThey don't have a clue. They're in a state of chaos, and can't even appoint a leader without the blessing of Farage, Tice &amp; Yusuf\n\nhttps://t.co/9Mg4CdwrWF",
        "created_at": "2025-05-08 09:31:06"
    },
    {
        "tweet_id": 1920420397926781066,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920420397926781066",
        "tweet_content": "In it for the money?\n\nJohn Cottier, Reform UK councillor Horden and Dene House, Durham.\n\nHe used to be Juan Cottier 10 years ago. He was a Liberal Vannin Party candidate for the House of Keys on the Isle of Man.\n\nHe was then a Conservative councillor for Grantham Barrowby Gate in South Kesteven.\n\nSeems he had a bit of an issue with showing up - Councillor accused of only attending meeting to keep allowances in row over absences:\n\nhttps://t.co/Qlf72sUs5b",
        "created_at": "2025-05-08 10:07:57"
    },
    {
        "tweet_id": 1920451617067016678,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920451617067016678",
        "tweet_content": "Who is Reform UK’s Nick Humphries?\n\nNick Humphries, Reform UK councillor for Kingsley and Semilong in West Northamptonshire. \n\nHe didn’t canvas. He wasn’t at the count (see photo of the candidates that were) and is the only councillor to not appear for having their photo taken by the Council for their website.",
        "created_at": "2025-05-08 12:12:00"
    },
    {
        "tweet_id": 1920498292581888004,
        "author_id": 2323710210,
        "url": "https://x.com/RobertJenrick/status/1920498292581888004",
        "tweet_content": "Just 7 days after being elected the Reform councillor in Newark has resigned saying he’s “not in a position to represent the people of Newark in the way they deserve”.\n\nPerhaps he should have thought about that before standing.\n\nThousands of £ will now be wasted on a by-election. https://t.co/nj6DQ2a5Xe",
        "created_at": "2025-05-08 15:17:28"
    },
    {
        "tweet_id": 1920498292581888004,
        "author_id": 2323710210,
        "url": "https://x.com/RobertJenrick/status/1920498292581888004",
        "tweet_content": "Just 7 days after being elected the Reform councillor in Newark has resigned saying he’s “not in a position to represent the people of Newark in the way they deserve”.\n\nPerhaps he should have thought about that before standing.\n\nThousands of £ will now be wasted on a by-election. https://t.co/nj6DQ2a5Xe",
        "created_at": "2025-05-08 15:17:28"
    },
    {
        "tweet_id": 1920537673187332379,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920537673187332379",
        "tweet_content": "Councillor Marie Hume, Wainfleet, Reform UK, had to be told she is now a councillor in Lincolnshire County Council after describing herself as an East Lindsey Council Councillor.\n\nWorth knowing your actual job title. https://t.co/nEHFUQKgIE",
        "created_at": "2025-05-08 17:53:57"
    },
    {
        "tweet_id": 1920563400209203446,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920563400209203446",
        "tweet_content": "Reform UK’s new Leader of @Kent_cc is Linden Kemkaran (@lindenkemkaran)\n\nFormer Conservative candidate for Bradford that RT’d a post stating Muslims have a ‘nasty’ culture &amp; 3rd world ways. \n\nShe’s also a BBC journalist.",
        "created_at": "2025-05-08 19:36:11"
    },
    {
        "tweet_id": 1920787130214699188,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920787130214699188",
        "tweet_content": "Reform UK taking down Ukrainian Flag at Kent Council.\n\nReform UK Councillor Paul Chamberlain, Herne Bay East, Kent having to try to explain it to his constituents.\n\nTrying to say they still support Ukraine, despite this massive gesture of rejection.\n\nNot sure he realises that his last line of the statement makes it look like he wants Ukraine to sort out potholes in Kent. Think they're a bit busy right now...",
        "created_at": "2025-05-09 10:25:12"
    },
    {
        "tweet_id": 1920787130214699188,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920787130214699188",
        "tweet_content": "Reform UK taking down Ukrainian Flag at Kent Council.\n\nReform UK Councillor Paul Chamberlain, Herne Bay East, Kent having to try to explain it to his constituents.\n\nTrying to say they still support Ukraine, despite this massive gesture of rejection.\n\nNot sure he realises that his last line of the statement makes it look like he wants Ukraine to sort out potholes in Kent. Think they're a bit busy right now...",
        "created_at": "2025-05-09 10:25:12"
    },
    {
        "tweet_id": 1920796415820718395,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920796415820718395",
        "tweet_content": "Rob Parsonage, Reform UK's new Councillor for Torpoint in Cornwall seems to be reporting people to the police for hate crimes...\n\nSeems like a councilor (who is seeking to lead the council) is wasting police time. https://t.co/GneDME5dzc",
        "created_at": "2025-05-09 11:02:06"
    },
    {
        "tweet_id": 1920825668989800526,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920825668989800526",
        "tweet_content": "Anderson selected as Reform UK group leader on Buckinghamshire Council:\nhttps://t.co/qhqFSeP77G\n\nFormer Conservative, lied about being a councillor: https://t.co/z1MWCncbWl\n\nLooks a lot like Kim Jong Un in this video...\nhttps://t.co/PdgBEOhvhY",
        "created_at": "2025-05-09 12:58:21"
    },
    {
        "tweet_id": 1920828571817263501,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920828571817263501",
        "tweet_content": "Congratulations David Shaw, Reform UK's new Councillor in Fleetwood East, Lancashire.\n\nBut commiserations on that 1 star food hygiene rating at your pub. Do you think taking on being a councillor is probably biting off a bit more than you can chew?\n\nThough not sure you'd want to bite anything from the Strawberry Gardens in Fleetwood.",
        "created_at": "2025-05-09 13:09:53"
    },
    {
        "tweet_id": 1920829798055624873,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920829798055624873",
        "tweet_content": "Pete Morris, Reform UK is Reform UK's new Councillor for Loughborough North, Leicestershire.\n\n“Morris suggested that the coronavirus had been manufactured and released so the pharmaceutical industry could make billions from ‘potentially harmful so-called vaccines’. ”  \n\nHe’s also a 15min cities conspiracy theorist.\n\nhttps://t.co/CO4Py0xRNj\n\nhttps://t.co/OdR4Jz3aUG",
        "created_at": "2025-05-09 13:14:45"
    },
    {
        "tweet_id": 1920838103066915049,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1920838103066915049",
        "tweet_content": "Alistair Arundell (@Microlightquikr), Reform UK's new Councillor for Boston Coastal, Lincolnshire.  \n\nHe runs 41 businesses - does he have time to be a councillor?  \n\nWe ask because he quit after 5 months last time he was one, when he was a Conservative. \n\nHe quit because he couldn't commit time to giving the job 100% (his words):  https://t.co/uYDuMLORQ5\n\nWonder how long it will take before he does again.",
        "created_at": "2025-05-09 13:47:45"
    },
    {
        "tweet_id": 1921068692189647089,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921068692189647089",
        "tweet_content": "Reform “will learn very quickly how difficult it is” to run councils, says Wrexham Council Leader\n\nhttps://t.co/NN5fZQTcvl",
        "created_at": "2025-05-10 05:04:02"
    },
    {
        "tweet_id": 1921097598389149790,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921097598389149790",
        "tweet_content": "James Gamble (@gamble_jam54041) is Reform UK’s new councillor for Sherwood Forest, #Nottingham (@NSDCouncil).\n\nImagine being a councillor for a party who wants to scrap DEI but yet you train people in neurodiversity?\n\nHis training ‘Neurodiversity with James’ offers  ‘Workplace Adaptations for Staff’. Sounds a lot like DEI. That's because it is.",
        "created_at": "2025-05-10 06:58:54"
    },
    {
        "tweet_id": 1921448929066942722,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921448929066942722",
        "tweet_content": "Reform UK’s new Devon Councillor for Pinhoe and Mincinglake Ed Hill posted door camera footage of a canvasser during the election, saying ‘unfortunately I was out’.\n\nSeems he’s out again, in Japan, just days after being elected - not the dedicated start to being a councillor that Devon deserves.",
        "created_at": "2025-05-11 06:14:58"
    },
    {
        "tweet_id": 1921448929066942722,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921448929066942722",
        "tweet_content": "Reform UK’s new Devon Councillor for Pinhoe and Mincinglake Ed Hill posted door camera footage of a canvasser during the election, saying ‘unfortunately I was out’.\n\nSeems he’s out again, in Japan, just days after being elected - not the dedicated start to being a councillor that Devon deserves.",
        "created_at": "2025-05-11 06:14:58"
    },
    {
        "tweet_id": 1921451403660218717,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921451403660218717",
        "tweet_content": "Didn’t take long for Kent County Council's new Reform UK Leader Linden Kemkaran to start lapping up the gifts… https://t.co/gdObIiA3kj",
        "created_at": "2025-05-11 06:24:48"
    },
    {
        "tweet_id": 1921466515431285086,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921466515431285086",
        "tweet_content": "Hope Not Hate did a review of Doncaster candidates, Reform UK have taken no action: https://t.co/176dW4TmEQ",
        "created_at": "2025-05-11 07:24:51"
    },
    {
        "tweet_id": 1921469892840001993,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921469892840001993",
        "tweet_content": "Hi @MyDoncaster your new councillor Mark Broadhurst as highlighted above posts a lot of offensive material on Facebook. Here he on a post he did thanking people for being elected just days ago.\n\nSomeone has called him out, and all he does is laugh emoji.\n\nThis is hardly upholding the image of the council as a councillor.\n\nOr does City of Doncaster agree we should pop the boats?",
        "created_at": "2025-05-11 07:38:16"
    },
    {
        "tweet_id": 1921801117903593923,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921801117903593923",
        "tweet_content": "Linden Kemkaran: Journalist, Dramatist, Lawbreaker — Now Leader of Kent County Council\n\nhttps://t.co/ykOF68OTqC",
        "created_at": "2025-05-12 05:34:26"
    },
    {
        "tweet_id": 1921875414793732415,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921875414793732415",
        "tweet_content": "Reform UK have appointed Martin Murray as Deputy Leader of Reform Staffordshire County Council.\n\nMurray said his club (the UK's longest running) closed down due to the pressure of COVID. Interesting given it started being wound down in 2018:\n\nhttps://t.co/ueAopewy20\n\nThe flats he's building on the site (despite being Regional Ambassador for @wearethentia) are coming along, though he's wriggled out of adding 20% social housing.\n\nSeems Reform UK Staffordshire has a liar as a deputy and someone who lets down the communities he's supposed to support.",
        "created_at": "2025-05-12 10:29:40"
    },
    {
        "tweet_id": 1921875414793732415,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1921875414793732415",
        "tweet_content": "Reform UK have appointed Martin Murray as Deputy Leader of Reform Staffordshire County Council.\n\nMurray said his club (the UK's longest running) closed down due to the pressure of COVID. Interesting given it started being wound down in 2018:\n\nhttps://t.co/ueAopewy20\n\nThe flats he's building on the site (despite being Regional Ambassador for @wearethentia) are coming along, though he's wriggled out of adding 20% social housing.\n\nSeems Reform UK Staffordshire has a liar as a deputy and someone who lets down the communities he's supposed to support.",
        "created_at": "2025-05-12 10:29:40"
    },
    {
        "tweet_id": 1922153662521933995,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922153662521933995",
        "tweet_content": "“Shenanigans”\n\nDefinition: secret or dishonest activity or manoeuvring.\n\nLike trying to register your address at your campaign managers’s house, then changing it to a random rented house at the 11th hour.\n\nYou didn’t live in Lincolnshire and dishonestly manoeuvred to claim you did Andrea.",
        "created_at": "2025-05-13 04:55:19"
    },
    {
        "tweet_id": 1922159840316551307,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922159840316551307",
        "tweet_content": "Reform UK have selected Joseph Boam as Deputy Leader in NW Leicestershire.\n\nTalk about rewarding failure.\n\nHe was branch chair during the election and took no action over these: https://t.co/onEqbNmgpI\n\nReform UK in Leicestershire are fine with racism.",
        "created_at": "2025-05-13 05:19:52"
    },
    {
        "tweet_id": 1922362507756196123,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922362507756196123",
        "tweet_content": "Reform council leader claimed circumcision leads to transgenderism\n\nAn ‘absurd and disgraceful’ tweet from Sean Matthews, the newly elected leader of Lincolnshire county council, has angered Jewish groups\n\nhttps://t.co/iO5ysXP4VB https://t.co/wKddypNK8t",
        "created_at": "2025-05-13 18:45:12"
    },
    {
        "tweet_id": 1922574229242876336,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922574229242876336",
        "tweet_content": "Arlene Dearlove is Reform UK's candidate for Carshalton South & Clockhouse for the forthcoming by-election on 22nd May.\n\nWe call on @reformparty_uk to drop this candidate.\n\nShe clearly supports Britain First with many interactions with Paul Golding and Ashley Simon. Here also enquiring about the European Defence League (an offshoot of the English Defence League) ‘million man march’.",
        "created_at": "2025-05-14 08:46:30"
    },
    {
        "tweet_id": 1922589444671991836,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922589444671991836",
        "tweet_content": "@Yorks_T_Drinker MPs aren't required to, the Mayor of Great Lincoln and councillors are.",
        "created_at": "2025-05-14 09:46:58"
    },
    {
        "tweet_id": 1922590239601709282,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922590239601709282",
        "tweet_content": "@SiBlack82 She was required to live in Lincolnshire as part of standing to be Mayor so should have moved 12 weeks ago, you bell.",
        "created_at": "2025-05-14 09:50:07"
    },
    {
        "tweet_id": 1922595493495853116,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922595493495853116",
        "tweet_content": "New Lincolnshire County Councillor for Hough criticised for ‘racist discussion’ by Reform UK Exposed\n\nhttps://t.co/9qIe0e250U",
        "created_at": "2025-05-14 10:11:00"
    },
    {
        "tweet_id": 1922689667520135302,
        "author_id": 1408082217750994950,
        "url": "https://x.com/Joseph_Boam/status/1922689667520135302",
        "tweet_content": "I’m incredibly honoured to have been appointed today as the Deputy Leader of Leicestershire County Council and as the Cabinet Member for Adult Social Care.\n\nThis marks a historic moment as we become the first Reform UK members to serve as Leader and Deputy Leader of a County Council, a real milestone not just for Leicestershire, but for the party nationally.\n\nIt’s a huge privilege to be entrusted with this responsibility, and I’m committed to delivering real change and support for residents across our county, especially in such an important area as adult social care.\n\nToday was also my first time speaking in the council chamber, and it was a moment I’ll never forget. I had the honour of seconding two motions and was proud to put forward the motion to appoint Cllr Dan Harrison as Leader of Leicestershire County Council.\n\nThank you to everyone who has supported me on this journey so far, this is just the beginning.",
        "created_at": "2025-05-14 16:25:13"
    },
    {
        "tweet_id": 1922689667520135302,
        "author_id": 1408082217750994950,
        "url": "https://x.com/Joseph_Boam/status/1922689667520135302",
        "tweet_content": "I’m incredibly honoured to have been appointed today as the Deputy Leader of Leicestershire County Council and as the Cabinet Member for Adult Social Care.\n\nThis marks a historic moment as we become the first Reform UK members to serve as Leader and Deputy Leader of a County Council, a real milestone not just for Leicestershire, but for the party nationally.\n\nIt’s a huge privilege to be entrusted with this responsibility, and I’m committed to delivering real change and support for residents across our county, especially in such an important area as adult social care.\n\nToday was also my first time speaking in the council chamber, and it was a moment I’ll never forget. I had the honour of seconding two motions and was proud to put forward the motion to appoint Cllr Dan Harrison as Leader of Leicestershire County Council.\n\nThank you to everyone who has supported me on this journey so far, this is just the beginning.",
        "created_at": "2025-05-14 16:25:13"
    },
    {
        "tweet_id": 1922895301980860716,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922895301980860716",
        "tweet_content": "Joseph Boam has been appointed Deputy Leader of Leicestershire Council by Reform UK and cabinet member for Adult Social Care.\n\nThis is the guy who as Branch Chair for Reform in Leicestershire took ZERO action on his candidate Elliott Allman who used the racist slur “black cunt” and the activist who said ‘always have a photo of yourself with a black person in your pocket’ on social media.\n\nNicknamed ‘Baby Boam’ he has little life experience past campaigning for the Conservatives and Reform, and driving luxury cars.",
        "created_at": "2025-05-15 06:02:20"
    },
    {
        "tweet_id": 1922895301980860716,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922895301980860716",
        "tweet_content": "Joseph Boam has been appointed Deputy Leader of Leicestershire Council by Reform UK and cabinet member for Adult Social Care.\n\nThis is the guy who as Branch Chair for Reform in Leicestershire took ZERO action on his candidate Elliott Allman who used the racist slur “black cunt” and the activist who said ‘always have a photo of yourself with a black person in your pocket’ on social media.\n\nNicknamed ‘Baby Boam’ he has little life experience past campaigning for the Conservatives and Reform, and driving luxury cars.",
        "created_at": "2025-05-15 06:02:20"
    },
    {
        "tweet_id": 1922934615955673185,
        "author_id": 1830562634107678720,
        "url": "https://x.com/RUKWales/status/1922934615955673185",
        "tweet_content": "Great news for voters in the Lliedi ward ahead of the Carmarthenshire by-election on May 29th! 🗳️\n\nIf you’re fed up with the same old parties and feel let down by politics, there is an alternative. Michelle Beer is standing for Reform UK in Llanelli a real choice for real change. https://t.co/kxNEiqq95G",
        "created_at": "2025-05-15 08:38:33"
    },
    {
        "tweet_id": 1922934615955673185,
        "author_id": 1830562634107678720,
        "url": "https://x.com/RUKWales/status/1922934615955673185",
        "tweet_content": "Great news for voters in the Lliedi ward ahead of the Carmarthenshire by-election on May 29th! 🗳️\n\nIf you’re fed up with the same old parties and feel let down by politics, there is an alternative. Michelle Beer is standing for Reform UK in Llanelli a real choice for real change. https://t.co/kxNEiqq95G",
        "created_at": "2025-05-15 08:38:33"
    },
    {
        "tweet_id": 1922954640888353253,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922954640888353253",
        "tweet_content": "Reform UK have elected Michael Fife Cook (@FifeCook), councillor for Yelverton Rural, as group leader on Devon County Council.\n\nHow does someone go from deep socialist, supporter of TUC, Corbyn, Galloway, Free Palestine, pro-Trans Rights and a Climate Change advocate to @ReformParty_UK Leader of council, all in a couple of years?\n\nLet's look at his views...",
        "created_at": "2025-05-15 09:58:07"
    },
    {
        "tweet_id": 1922954640888353253,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922954640888353253",
        "tweet_content": "Reform UK have elected Michael Fife Cook (@FifeCook), councillor for Yelverton Rural, as group leader on Devon County Council.\n\nHow does someone go from deep socialist, supporter of TUC, Corbyn, Galloway, Free Palestine, pro-Trans Rights and a Climate Change advocate to @ReformParty_UK Leader of council, all in a couple of years?\n\nLet's look at his views...",
        "created_at": "2025-05-15 09:58:07"
    },
    {
        "tweet_id": 1922961506859131051,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1922961506859131051",
        "tweet_content": "Kind of Reform UK's Mayor of Lincolnshire @andreajenkyns to help give directions to dogging sites. https://t.co/3EKMOe29Xa",
        "created_at": "2025-05-15 10:25:24"
    },
    {
        "tweet_id": 1922997706009510274,
        "author_id": 63679031,
        "url": "https://x.com/LewisJWarner/status/1922997706009510274",
        "tweet_content": "BREAKING \n\nReform UK councillor on Staffordshire County Council Wayne Titley has quit.\n\nHe represented the people of Gnosall &amp; Eccleshall for less than 2 weeks. \n\nA social media post claimed the navy should use a ‘volley of gunfire’ to put off illegal crossings.\n\n@itvcentral https://t.co/vXSwgeKUP0",
        "created_at": "2025-05-15 12:49:15"
    },
    {
        "tweet_id": 1923059600594460676,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923059600594460676",
        "tweet_content": "Guess who Reform UK just made Lincolnshire Deputy Group Leader? \n\nPrincess Fiona. \n\nSorry, we mean Councillor Robert Gibson. https://t.co/54olHEa8hE",
        "created_at": "2025-05-15 16:55:12"
    },
    {
        "tweet_id": 1923087194429837469,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923087194429837469",
        "tweet_content": "@LeeAndersonMP_ @TiceRichard Like this large solar farm that Mayor of Lincolnshire @andreajenkyns opened on farmland? https://t.co/CJ5QnzvFd3",
        "created_at": "2025-05-15 18:44:51"
    },
    {
        "tweet_id": 1923087443114221667,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923087443114221667",
        "tweet_content": "Like this large solar farm that Mayor of Lincolnshire @andreajenkyns opened on farmland? https://t.co/KncpoCq6Nn",
        "created_at": "2025-05-15 18:45:50"
    },
    {
        "tweet_id": 1923128548329508959,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923128548329508959",
        "tweet_content": "Reform UK’s new Leader of West Northamptonshire Council Mark Arnull (@markarnull) has confirmed that he’s fine with Britain First and Tommy Robinson supporters in his @WestNorthants team.\n\nHe has stated he is fully backing Ivan Dabbs (@ipdabbs99), yes this one: https://t.co/8GqHNRbOMA\n\nGrim day for #Northampton.\n\nShame on @reformparty_uk.",
        "created_at": "2025-05-15 21:29:10"
    },
    {
        "tweet_id": 1923242802390966560,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923242802390966560",
        "tweet_content": "Reform UK Northumberland County Council elect council leader - Mark Peart.\n\nThat’s a name we’ve heard before:\n\nHate speech and climate denial: inside the Facebook network run by Reform candidates\n\nhttps://t.co/9r6Z21Rfhh",
        "created_at": "2025-05-16 05:03:10"
    },
    {
        "tweet_id": 1923245822507991058,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923245822507991058",
        "tweet_content": "Reform UK councillor quits 14 days after winning Staffordshire seat \n\nhttps://t.co/aForMoeDuO",
        "created_at": "2025-05-16 05:15:10"
    },
    {
        "tweet_id": 1923259660783493220,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923259660783493220",
        "tweet_content": "Work for Leicestershire Council?\n\nDon’t bother booking holiday this summer, just call in sick and head to Spain, Reform UK’s new Council Leader just confirmed it’s ok. https://t.co/jEEzuRhBJe",
        "created_at": "2025-05-16 06:10:10"
    },
    {
        "tweet_id": 1923323940513939572,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923323940513939572",
        "tweet_content": "West Northamptonshire Council’s first meeting last night.\n\nReform UK were asked where their manifesto for the council was - their answer was 'the contract on the Reform UK website'.\n\nYes, the same contract @nigel_farage himself scrapped 2 months after the General Election and that was described as ‘Liz Truss on steroids’. The main issue is, councils can’t deliver the majority of what was in the contract: https://t.co/vcdZTc3zL2\n\nThat’s what Reform UK are not delivering locally folks.\n\n35mins in here: https://t.co/DoSs0Zv5jb. \n\n2 Reform UK councillors failed to attend.",
        "created_at": "2025-05-16 10:25:35"
    },
    {
        "tweet_id": 1923612356430434312,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923612356430434312",
        "tweet_content": "West Northamptonshire Council had their first Council meeting. The photo here shows the new council group. What is noticeable is that 6 councillors are not in it.\n\nGuess who is also missing? Nicholas Humphries, who we previously highlighted didn’t canvas, and didn’t show up to the count:\nhttps://t.co/NO83kUfyM5\n\nWill we see more Reform UK council quitters in the next couple of weeks?\n\nWhat’s also strange is that Group Leader Mark Arnull didn’t turn up to the first meeting.",
        "created_at": "2025-05-17 05:31:39"
    },
    {
        "tweet_id": 1923614524382302629,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923614524382302629",
        "tweet_content": "Opposition leaders strongly criticise West Northamptonshire’s new Reform-led council for having 'no manifesto' \n\nhttps://t.co/oAoJ6vfJBB",
        "created_at": "2025-05-17 05:40:16"
    },
    {
        "tweet_id": 1923652282941325732,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923652282941325732",
        "tweet_content": "Reform UK Councillor Mandy Clare has been filming in changing rooms around Chester and complaining about trans women.\n\nMore on her: https://t.co/d7YEGK9wht https://t.co/nnYO2l3qkv",
        "created_at": "2025-05-17 08:10:18"
    },
    {
        "tweet_id": 1923733271843652095,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923733271843652095",
        "tweet_content": "Hi @markarnull, you stated that you found no issue with Ivan Dabbs’s social media posts.\n\nAre you saying that @reformparty_uk West Northamptonshire are fine with this? https://t.co/X1nhCz2mQ1",
        "created_at": "2025-05-17 13:32:07"
    },
    {
        "tweet_id": 1923798995509403858,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923798995509403858",
        "tweet_content": "Dan Harrison is Reform UK’s new leader of Leicestershire County Council in this interview he bashes the Conservatives, which makes him sound ridiculous, because he only defected from them as a councillor in February…\n\nhttps://t.co/wmc0ZXpasw",
        "created_at": "2025-05-17 17:53:17"
    },
    {
        "tweet_id": 1923985664778932589,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1923985664778932589",
        "tweet_content": "Reform UK’s new councillor @ipdabbs99 is a Britain First supporting racist.\n\n@reformparty_uk Mark Arnull, Leader in West #Northamptonshire has fully supported him and in doing so, Britain First.\n\n@WestNorthants https://t.co/IKdklnrWUZ",
        "created_at": "2025-05-18 06:15:03"
    },
    {
        "tweet_id": 1924107053179474008,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924107053179474008",
        "tweet_content": "Reform UK MP @JamesReform locked his Twitter account the day he was elected. A number of posts disappeared that day, but they’re still discoverable.\n\nHere he is trying to get the support of Andrew Tate, Natalie the Norfolk Lion and that bloke Ben who Waitrose sacked in the run up to the General Election.",
        "created_at": "2025-05-18 14:17:24"
    },
    {
        "tweet_id": 1924375705770447316,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924375705770447316",
        "tweet_content": "Joseph Boam (@Joseph_Boam) Deputy Leader of Reform UK in Leicestershire has been given the portfolio of adult social care.\n\nAdult social care. Here's his view on depression.\n\n@reformparty_uk will likely find a mealy-mouthed way to explain this one. https://t.co/Z93tBw1UQ3",
        "created_at": "2025-05-19 08:04:56"
    },
    {
        "tweet_id": 1924703033834832329,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924703033834832329",
        "tweet_content": "Reform UK elects Reform UK Wiltshire Council group leader Ace Rimmer.\n\nHe defected from the Conservatives last year. \n\nhttps://t.co/Hqhz0Fbtcd https://t.co/JmqAzYxesb",
        "created_at": "2025-05-20 05:45:37"
    },
    {
        "tweet_id": 1924703425486336064,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924703425486336064",
        "tweet_content": "Reform gives up on leading Cornwall Council \n\nhttps://t.co/ksoMGy474S",
        "created_at": "2025-05-20 05:47:10"
    },
    {
        "tweet_id": 1924706005369131038,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924706005369131038",
        "tweet_content": "West Northants Council leader 'happy' for two councillors who shared offensive tweets to continue in Reform UK administration in Northampton \n\nhttps://t.co/LbABE6wAdQ",
        "created_at": "2025-05-20 05:57:25"
    },
    {
        "tweet_id": 1924713518873419894,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924713518873419894",
        "tweet_content": "How do you train someone to not ‘want to ban Islam in the UK’ or to  not think we are ‘being infiltrated by Asians’?\n\nNew Broadland Reform UK councillor 'receiving training' over tweets: https://t.co/lIBApGTTX1\n\nOur expose of Jimmi Lee: https://t.co/n08feqxySZ",
        "created_at": "2025-05-20 06:27:17"
    },
    {
        "tweet_id": 1924812373925167383,
        "author_id": 19017675,
        "url": "https://x.com/Nigel_Farage/status/1924812373925167383",
        "tweet_content": "The Reform UK team on Cornwall Council. ✅ https://t.co/YxvrUxwzqs",
        "created_at": "2025-05-20 13:00:05"
    },
    {
        "tweet_id": 1924868775330853225,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924868775330853225",
        "tweet_content": "🚨 @reformparty_uk’s @McivorJaymey today tried to grandstand at Essex Council to promote his very delayed (hypocritical) petition about by-elections. \n\nA member of the council made this statement, an essential read about why he should not be on the council. Here it is in full: https://t.co/Kuuqq24Xio",
        "created_at": "2025-05-20 16:44:13"
    },
    {
        "tweet_id": 1924876361056825635,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924876361056825635",
        "tweet_content": "Nigel Farage Anywhere But Clacton World Tour\n\n2024\nAug: Arizona USA\nSept: Chicago USA \nSept: Kuala Lumpur, Malaysia\nNov: Pennsylvania, USA\nDec: NYC, USA\nDec: Washington, DC, USA\n\n2025\nJan: Washington, DC, USA\nFeb: Washington, DC, USA\nMar-Apr: UK wide\nMay: France\n\n#AnywhereButClacton",
        "created_at": "2025-05-20 17:14:21"
    },
    {
        "tweet_id": 1924876416186790270,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924876416186790270",
        "tweet_content": "Nigel Farage Anywhere But Clacton World Tour\n\n2024\nAug: Arizona USA\nSept: Chicago USA \nSept: Kuala Lumpur, Malaysia\nNov: Pennsylvania, USA\nDec: NYC, USA\nDec: Washington, DC, USA\n\n2025\nJan: Washington, DC, USA\nFeb: Washington, DC, USA\nMar-Apr: UK wide\nMay: France\n\n#AnywhereButClacton",
        "created_at": "2025-05-20 17:14:34"
    },
    {
        "tweet_id": 1924921754276823394,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1924921754276823394",
        "tweet_content": "Reform UK’s Mayor of Scarborough Thomas Murray.\n\nWearing Mayoral chains on a fishing boat making a non-ceremonial, political statement on Nextdoor. He’s also stating this is the view of the council whilst in the role of Mayor.\n\nOne for @northyorksc to look in to: https://t.co/q1mwzDjrii",
        "created_at": "2025-05-20 20:14:44"
    },
    {
        "tweet_id": 1925110505900847304,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925110505900847304",
        "tweet_content": "Dawn Abbott (@DawnAbb38274377) is Reform UK's Councillor for Staveley and mooted as portfolio holder for Health and Communities at Derbyshire County Council. \n\nThis role includes EDI, public health, community safety including hate crime and domestic violence and support to refugees dispersed to Derbyshire.\n\n@derbyshirecc you're probably going to want to consider if she's the right person for the job.\n\nStrap yourself in, you're in for a ride with this one's views...",
        "created_at": "2025-05-21 08:44:46"
    },
    {
        "tweet_id": 1925128111231791418,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925128111231791418",
        "tweet_content": "Lincolnshire County Council’s first Council agenda under Reform UK has been published. \n\nWhat’s on the agenda?\n\nAbolishing Flood Risk and Water Management Scrutiny. https://t.co/9CQGgSBxcx",
        "created_at": "2025-05-21 09:54:43"
    },
    {
        "tweet_id": 1925180298045559056,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925180298045559056",
        "tweet_content": "Reform UK Councillors that have supported or promoted Britain First\n\nIvan Dabbs:\nhttps://t.co/8GqHNRbOMA\n\nPeter Evans:\nhttps://t.co/uhFdoofuYy\n\nSteve Biggs:\nhttps://t.co/XXaDJOLEzl\n\nVirge Richichi:\nhttps://t.co/YkxedFua9n\n\nGerald Squire:\nhttps://t.co/qFOKU8y71s\n\nPaul Harrison\nhttps://t.co/L6Wu3SY63a\n\nRussell Cherry\nhttps://t.co/Js7eLvOI9u\n\nRhys James Machin:\nhttps://t.co/GTvpyf5FFk\n\nCandidates \n\nArlene Dearlove:\nhttps://t.co/mmYBW0djV8\n\nMiriam Thomas:\nhttps://t.co/H5rfV9b4jB\n\nRyan Edwards:\nhttps://t.co/mg6YT0Qnfa\n\nMark Matlock:\nhttps://t.co/G65VTatzn2\n\nJason Cooke:\nhttps://t.co/IL8fER5Vd3\n\nBrian Aspey:\nhttps://t.co/7C77n0styn\n\nHamish Haddow:\nhttps://t.co/y0ACEMjPlL\n\nStewart Sutherland:\nhttps://t.co/lAeHtvV3p9\n\nStewart Mackay:\nhttps://t.co/MOhxQjAwpu\n\nDarren Ingrouille:\nhttps://t.co/VKH4gJd0V5\n\nPeter Storms:\nhttps://t.co/BpIKN62MJT\n\nRegional Chairs\n\nSpencer Bullard:\nhttps://t.co/plFzXLmcc3\n\nAnas El-Hamri:\nhttps://t.co/TN3moQWSzI\n\nBranches\n\nDover & Deal:\nhttps://t.co/CMgwRxcLRG",
        "created_at": "2025-05-21 13:22:05"
    },
    {
        "tweet_id": 1925189004850274600,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925189004850274600",
        "tweet_content": "Reform UK Cornwall’s Brass Neck\n\nHaving only won 28 of the required 44 seats to form a council administration, Reform UK in Cornwall are complaining that the other parties have formed a perfectly legal and proper administration as a coalition.\n\nThey fail to mention their behaviour in Cornwall has hugely contributed to the lack of friends they have.",
        "created_at": "2025-05-21 13:56:41"
    },
    {
        "tweet_id": 1925189004850274600,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925189004850274600",
        "tweet_content": "Reform UK Cornwall’s Brass Neck\n\nHaving only won 28 of the required 44 seats to form a council administration, Reform UK in Cornwall are complaining that the other parties have formed a perfectly legal and proper administration as a coalition.\n\nThey fail to mention their behaviour in Cornwall has hugely contributed to the lack of friends they have.",
        "created_at": "2025-05-21 13:56:41"
    },
    {
        "tweet_id": 1925220255942562064,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925220255942562064",
        "tweet_content": "Michelle Beer, Reform UK’s candidate in Lliedi, Carmarthenshire has picked up an endorsement from the far-right Voice of Wales:\n\nhttps://t.co/xinjPDQT4P",
        "created_at": "2025-05-21 16:00:52"
    },
    {
        "tweet_id": 1925285010954723832,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925285010954723832",
        "tweet_content": "Shaun Knowles, Reform UK Councillor for Cramlington South West, Northumberland.\n\nNo photo on the council website, no show at the AGM today. \n\nNot seen a photo of him yet. Is he going to show up?",
        "created_at": "2025-05-21 20:18:11"
    },
    {
        "tweet_id": 1925303337068474417,
        "author_id": 557453711,
        "url": "https://x.com/MonkEmma/status/1925303337068474417",
        "tweet_content": "Well this is grim….\n\nRotherham Borough Council has a new Mayor.\n\nAnd the Right are absolutely up in arms about the fact that she’s a Muslim woman.\n\nAnd they are of course spreading vile lies about her.\n\nSo let’s just do a little sense check shall we?\n\n🧵1/13 https://t.co/u69Aa3hVTF",
        "created_at": "2025-05-21 21:31:00"
    },
    {
        "tweet_id": 1925407470807113756,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925407470807113756",
        "tweet_content": "‘Anti-Reform protest 'an attack on democracy', new Lancashire leader claims’\n\nRecycled Conservative leader of the council Stephen Atkinson thinks protest is anti-democratic…\n\nhttps://t.co/pBXz6Ao0Xn",
        "created_at": "2025-05-22 04:24:48"
    },
    {
        "tweet_id": 1925449650431054141,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925449650431054141",
        "tweet_content": "Conservatives to run minority administration on Northumberland County Council \n\nhttps://t.co/oRbE5HdwVB",
        "created_at": "2025-05-22 07:12:24"
    },
    {
        "tweet_id": 1925461135337152934,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925461135337152934",
        "tweet_content": "Nigel Farage, dereliction of duty  \n\nTomorrow sees the important meeting of Clacton Town Board at 12.30 am.  \n\nThis is one that the MP should attend and always did.\n\nLast time he was in Florida, this time he's in France on holiday.\n\n#AnywhereButClacton https://t.co/aQ9khoQOBY",
        "created_at": "2025-05-22 07:58:02"
    },
    {
        "tweet_id": 1925487857696723240,
        "author_id": 1814750895978262529,
        "url": "https://x.com/ReformDaily_/status/1925487857696723240",
        "tweet_content": "🗳️ It’s election day in Carshalton South &amp; Clockhouse - polls open until 10pm!\n\nLet’s make history: vote Arlene Dearlove &amp; elect London’s first ever Reform councillor. 💪\n\nGood luck Arlene - time for real change! 🇬🇧\n\n#VoteReformUK #Carshalton #LocalElections2025 https://t.co/P1J8D6UOLQ",
        "created_at": "2025-05-22 09:44:13"
    },
    {
        "tweet_id": 1925496481143812368,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925496481143812368",
        "tweet_content": "Reform UK on Staffordshire Council have ordered library employees to remove any \"controversial\" materials and cancel \"controversial\" events. \n\nWe know where this is heading...\n\n#Farageheit451 https://t.co/YkppXygfGb",
        "created_at": "2025-05-22 10:18:29"
    },
    {
        "tweet_id": 1925513938491322495,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925513938491322495",
        "tweet_content": "Reform UK have had a pathetic start on Staffordshire County Council\n\nNot a single question was answered with replies being mainly 'we will get back to you'. They've had 3 weeks to prepare.\n\nOne question even included asking about the £27k cost for the by-election caused by Reform's Wayne Titley who was booted off the council for wanting the Royal Navy to shoot at migrants. Reform's Council Leader Ian Cooper (@Ian4Tamworth) had no answer.\n\nWatch it here: https://t.co/tpzZsdC0GQ\n\nIt's embarassing.",
        "created_at": "2025-05-22 11:27:51"
    },
    {
        "tweet_id": 1925514923938828639,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925514923938828639",
        "tweet_content": "Reform UK all talk, no action.\n\nReform UK's Nottinghamshire County Council councillors have had FOUR 'apologies' for non-attendance at the first AGM meeting.\n\nAll four recorded 'other' as their reason.\n\nCan't be bothered to show up.",
        "created_at": "2025-05-22 11:31:46"
    },
    {
        "tweet_id": 1925549603543253175,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925549603543253175",
        "tweet_content": "RT @reformexposed: Nigel Farage, dereliction of duty  \n\nTomorrow sees the important meeting of Clacton Town Board at 12.30 am.  \n\nThis is o…",
        "created_at": "2025-05-22 13:49:35"
    },
    {
        "tweet_id": 1925580628575092831,
        "author_id": 1814750895978262529,
        "url": "https://x.com/ReformDaily_/status/1925580628575092831",
        "tweet_content": "👏🏻Congratulations to Councillor Peter Osborne, Deputy Cabinet Member for Highways &amp; Transport!\n\nProud to have strong leadership in Folkestone, Hythe &amp; Romney Marsh with Reform UK\n\n#ReformUK #LocalLeadership #Kent @ReformUKFHRM https://t.co/xbOwsvE5hi",
        "created_at": "2025-05-22 15:52:52"
    },
    {
        "tweet_id": 1925586863152083065,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925586863152083065",
        "tweet_content": "RT @reformexposed: Reform UK all talk, no action.\n\nReform UK's Nottinghamshire County Council councillors have had FOUR 'apologies' for non…",
        "created_at": "2025-05-22 16:17:38"
    },
    {
        "tweet_id": 1925586886489182280,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925586886489182280",
        "tweet_content": "RT @reformexposed: Reform UK have had a pathetic start on Staffordshire County Council\n\nNot a single question was answered with replies bei…",
        "created_at": "2025-05-22 16:17:44"
    },
    {
        "tweet_id": 1925673061681938823,
        "author_id": 1318935853,
        "url": "https://x.com/McivorJaymey/status/1925673061681938823",
        "tweet_content": "🚨 Ongar by-election 🚨 \n\nLabour: 100 🥀 \n22%\nReform UK: 352 🇬🇧 \n78%\n\nReform UK GAIN from Labour \n\nBoshhhhh 🚀🚀🚀🚀🚀🚀\n\n📍 Ongar, Essex https://t.co/QEJY3X4V2O",
        "created_at": "2025-05-22 22:00:09"
    },
    {
        "tweet_id": 1925673061681938823,
        "author_id": 1318935853,
        "url": "https://x.com/McivorJaymey/status/1925673061681938823",
        "tweet_content": "🚨 Ongar by-election 🚨 \n\nLabour: 100 🥀 \n22%\nReform UK: 352 🇬🇧 \n78%\n\nReform UK GAIN from Labour \n\nBoshhhhh 🚀🚀🚀🚀🚀🚀\n\n📍 Ongar, Essex https://t.co/QEJY3X4V2O",
        "created_at": "2025-05-22 22:00:09"
    },
    {
        "tweet_id": 1925770087899750823,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925770087899750823",
        "tweet_content": "Reform UK Derbyshire scrap climate change committee\n\nhttps://t.co/Y8CcbkiUla",
        "created_at": "2025-05-23 04:25:42"
    },
    {
        "tweet_id": 1925770560589447640,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925770560589447640",
        "tweet_content": "Jobs for the boys.\n\nReform UK's all male Lancashire County Council line-up  \n\nhttps://t.co/qAd4YcQW9N",
        "created_at": "2025-05-23 04:27:35"
    },
    {
        "tweet_id": 1925778686898307452,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925778686898307452",
        "tweet_content": "“I’m not a racist, but.”\n\nThe owners of a Blackpool venue which has become the nation’s first Reform-branded pub have denied it is a haven for extreme right wingers and racists.\n\nhttps://t.co/TPNAQZmkSL https://t.co/Zug2XBDMqd",
        "created_at": "2025-05-23 04:59:52"
    },
    {
        "tweet_id": 1925785040585150564,
        "author_id": 1798665613151178752,
        "url": "https://x.com/JamesReform/status/1925785040585150564",
        "tweet_content": "78% of the votes go to Reform in latest Essex by-election. \n\nGain from Labour\n\nWell done team 👌",
        "created_at": "2025-05-23 05:25:07"
    },
    {
        "tweet_id": 1925822784506081614,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925822784506081614",
        "tweet_content": "Remember Nat ‘Free Fuck Finder’ Vanstone, elected Councillor for #Broadclyst in #Devon for Reform UK?\n\nDidn’t bother showing up for his first day in the office for the Devon CC AGM yesterday.",
        "created_at": "2025-05-23 07:55:06"
    },
    {
        "tweet_id": 1925872392573730966,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925872392573730966",
        "tweet_content": "RT @reformexposed: “I’m not a racist, but.”\n\nThe owners of a Blackpool venue which has become the nation’s first Reform-branded pub have de…",
        "created_at": "2025-05-23 11:12:14"
    },
    {
        "tweet_id": 1925872473800646725,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925872473800646725",
        "tweet_content": "RT @reformexposed: Jobs for the boys.\n\nReform UK's all male Lancashire County Council line-up  \n\nhttps://t.co/qAd4YcQW9N",
        "created_at": "2025-05-23 11:12:33"
    },
    {
        "tweet_id": 1925872491693568336,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925872491693568336",
        "tweet_content": "RT @reformexposed: Reform UK Derbyshire scrap climate change committee\n\nhttps://t.co/Y8CcbkiUla",
        "created_at": "2025-05-23 11:12:37"
    },
    {
        "tweet_id": 1925897847481749935,
        "author_id": 827005854,
        "url": "https://x.com/CharanpreetTV/status/1925897847481749935",
        "tweet_content": "In 2022 Sean Matthews - now Lincolnshire County Council’s leader - said that circumcision was making “children want to remove their penises and become girls.”\n\nHe says he apologised but still disagrees with circumcision + believes “genital mutilation for either sex is abhorrent.” https://t.co/AMdjlRTZND",
        "created_at": "2025-05-23 12:53:22"
    },
    {
        "tweet_id": 1925911187159494987,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925911187159494987",
        "tweet_content": "🚨Reform UK’s Councillor Barry Martin for Stretton in Staffordshire has posted this on Facebook asking if he should resign or not.\n\n@reformparty_uk, you need to take action as this is a slap in the face to his constituents.\n\nWe’ve highlighted him previously:\n\nhttps://t.co/DhF8SIa1Sg",
        "created_at": "2025-05-23 13:46:23"
    },
    {
        "tweet_id": 1925926108853088494,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925926108853088494",
        "tweet_content": "Reform-Led Kent Council Under Fire for Excluding Deaf Residents from Democracy\n\nhttps://t.co/G9f97Qqdzi",
        "created_at": "2025-05-23 14:45:40"
    },
    {
        "tweet_id": 1925946792253800926,
        "author_id": 130120037,
        "url": "https://x.com/PippaCrerar/status/1925946792253800926",
        "tweet_content": "EXCL: Nigel Farage claimed with great fanfare last year to have “bought a house” in Clacton – but it turns out the property is owned in the name of his girlfriend @rowenamason reports 👇\n .https://t.co/fcue5PFMNq",
        "created_at": "2025-05-23 16:07:52"
    },
    {
        "tweet_id": 1925948343571644692,
        "author_id": 19017675,
        "url": "https://x.com/Nigel_Farage/status/1925948343571644692",
        "tweet_content": "The Reform UK administration on Kent County Council. ✅ https://t.co/JTUjuvO6MU",
        "created_at": "2025-05-23 16:14:02"
    },
    {
        "tweet_id": 1925957490333593772,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925957490333593772",
        "tweet_content": "RT @PippaCrerar: EXCL: Nigel Farage claimed with great fanfare last year to have “bought a house” in Clacton – but it turns out the propert…",
        "created_at": "2025-05-23 16:50:22"
    },
    {
        "tweet_id": 1925958846322704894,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925958846322704894",
        "tweet_content": "Reform UK Carlisle Facebook Group to close.\n\nAt least some are realising how toxic these groups are. \n\nReform needs to get a grip on the racism and hate in these groups. Follow this lead. https://t.co/NIum2cmU6j",
        "created_at": "2025-05-23 16:55:46"
    },
    {
        "tweet_id": 1925963502532907460,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925963502532907460",
        "tweet_content": "@Nigel_Farage Got to love these holding posts whilst he neglects Clacton on the traditional day MPs are in constituency. \n\nHow’s France, Nigel?",
        "created_at": "2025-05-23 17:14:16"
    },
    {
        "tweet_id": 1925963527119933684,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925963527119933684",
        "tweet_content": "Got to love these holding posts whilst he neglects Clacton on the traditional day MPs are in constituency. \n\nHow’s France, Nigel?",
        "created_at": "2025-05-23 17:14:22"
    },
    {
        "tweet_id": 1925966635736662241,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1925966635736662241",
        "tweet_content": "RT @reformexposed: 🚨Reform UK’s Councillor Barry Martin for Stretton in Staffordshire has posted this on Facebook asking if he should resig…",
        "created_at": "2025-05-23 17:26:43"
    },
    {
        "tweet_id": 1925988809528737802,
        "author_id": 91078935,
        "url": "https://x.com/colder_sarcasm/status/1925988809528737802",
        "tweet_content": "Looks like Nigel Farage got his girlfriend to buy his constituency home in Clacton to avoid paying the higher rate of stamp duty!? \n\nWhat a patriot. \n\nhttps://t.co/zxWn0TKas5",
        "created_at": "2025-05-23 18:54:49"
    },
    {
        "tweet_id": 1926128472235167906,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926128472235167906",
        "tweet_content": "RT @reformexposed: Reform-Led Kent Council Under Fire for Excluding Deaf Residents from Democracy\n\nhttps://t.co/G9f97Qqdzi",
        "created_at": "2025-05-24 04:09:48"
    },
    {
        "tweet_id": 1926133740566175815,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926133740566175815",
        "tweet_content": "Reform shun offer to join mayor's executive group\n\nhttps://t.co/mX6aG9DRRI\n\nEvery time the news mentions Guy Aston, Reform UK’s Leader on Doncaster Council, don’t forget he believes the Rothschild, Warburg, and Baruch Jewish banking families are “responsible for funding Kalergi’s genocidal ideology”.\n\nIt’s a debunked far-right, antisemitic, white genocide conspiracy theory.",
        "created_at": "2025-05-24 04:30:44"
    },
    {
        "tweet_id": 1926148159006187652,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926148159006187652",
        "tweet_content": "RT @colder_sarcasm: Looks like Nigel Farage got his girlfriend to buy his constituency home in Clacton to avoid paying the higher rate of s…",
        "created_at": "2025-05-24 05:28:01"
    },
    {
        "tweet_id": 1926162572253802882,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926162572253802882",
        "tweet_content": "Reform UK had 3 councillors send apologies at Lincolnshire CC yesterday.\n\nOf them one was Manzur Hasan, the other Carl Edgoose-Zagorskiy.\n\nWhat a confused political party. https://t.co/azGMZfyGlO",
        "created_at": "2025-05-24 06:25:18"
    },
    {
        "tweet_id": 1926192347240452301,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926192347240452301",
        "tweet_content": "Reform UK’s County Councillor for Pinhoe and Mincinglake, Edward Hill.\n\nNot the greatest first contribution to Devon County Council… https://t.co/rIe84vOQHk",
        "created_at": "2025-05-24 08:23:37"
    },
    {
        "tweet_id": 1926226946154721694,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926226946154721694",
        "tweet_content": "RT @reformexposed: Reform UK had 3 councillors send apologies at Lincolnshire CC yesterday.\n\nOf them one was Manzur Hasan, the other Carl E…",
        "created_at": "2025-05-24 10:41:06"
    },
    {
        "tweet_id": 1926274433037095226,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926274433037095226",
        "tweet_content": "RT @reformexposed: Reform UK’s County Councillor for Pinhoe and Mincinglake, Edward Hill.\n\nNot the greatest first contribution to Devon Cou…",
        "created_at": "2025-05-24 13:49:47"
    },
    {
        "tweet_id": 1926295261791375451,
        "author_id": 1830562634107678720,
        "url": "https://x.com/RUKWales/status/1926295261791375451",
        "tweet_content": "Great support for our candidate, Michelle Beer, in the Lliedi ward ahead of the Carmarthenshire by-election on May 29th! 🗳️\n\nWales needs Reform 🏴󠁧󠁢󠁷󠁬󠁳󠁿 https://t.co/CUko7SIxSO",
        "created_at": "2025-05-24 15:12:33"
    },
    {
        "tweet_id": 1926300097064657373,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926300097064657373",
        "tweet_content": "Reform UK by-election costing Staffordshire taxpayers £27k \n\nhttps://t.co/PCTxiOYvmm",
        "created_at": "2025-05-24 15:31:46"
    },
    {
        "tweet_id": 1926301978927206883,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926301978927206883",
        "tweet_content": "Councillor's offensive Facebook posts ‘unacceptable’ says Doncaster Reform UK leader \n\nhttps://t.co/IWYy3w0ngQ",
        "created_at": "2025-05-24 15:39:15"
    },
    {
        "tweet_id": 1926504870552514903,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926504870552514903",
        "tweet_content": "RT @reformexposed: Councillor's offensive Facebook posts ‘unacceptable’ says Doncaster Reform UK leader \n\nhttps://t.co/IWYy3w0ngQ",
        "created_at": "2025-05-25 05:05:28"
    },
    {
        "tweet_id": 1926504912881381730,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926504912881381730",
        "tweet_content": "RT @reformexposed: Reform UK by-election costing Staffordshire taxpayers £27k \n\nhttps://t.co/PCTxiOYvmm",
        "created_at": "2025-05-25 05:05:38"
    },
    {
        "tweet_id": 1926548976288878779,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926548976288878779",
        "tweet_content": "RT @reformexposed: Reform UK on Staffordshire Council have ordered library employees to remove any \"controversial\" materials and cancel \"co…",
        "created_at": "2025-05-25 08:00:44"
    },
    {
        "tweet_id": 1926592833542094931,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926592833542094931",
        "tweet_content": "Are Reform UK in Lincolnshire lazy or just plain clueless?\n\nThey think Culture should be placed under Children’s services, so have done just that.\n\nThe maintenance of a multi million pound art collection including Lowry and Henry Moore’s is child’s play according to them. https://t.co/TmyrfTCJOR",
        "created_at": "2025-05-25 10:55:00"
    },
    {
        "tweet_id": 1926640189658575210,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926640189658575210",
        "tweet_content": "Reform UK’s Councillor Desperate Dan Harrison, Leader of Leicestershire used to wear a rainbow lanyard when he was a Conservative. \n\nNow he doesn’t. \n\nWonder if he’s been told to not? https://t.co/WN5JwEgimc",
        "created_at": "2025-05-25 14:03:11"
    },
    {
        "tweet_id": 1926640331971293423,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926640331971293423",
        "tweet_content": "RT @reformexposed: Are Reform UK in Lincolnshire lazy or just plain clueless?\n\nThey think Culture should be placed under Children’s service…",
        "created_at": "2025-05-25 14:03:45"
    },
    {
        "tweet_id": 1926648444485054653,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926648444485054653",
        "tweet_content": "Reform UK’s Lincolnshire County Councillor for Sleaford, and Executive Councillor for Adult Care and Health Steve Clegg (@CleggCllr).\n\nWhat’s his policy focus? \nAcupuncture for all?\n\nhttps://t.co/03O0sl3nLS\n\nHe also seems to have deleted all 1,659 posts on his Twitter. https://t.co/iDgla2q8a5",
        "created_at": "2025-05-25 14:35:59"
    },
    {
        "tweet_id": 1926650087570088065,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926650087570088065",
        "tweet_content": "Bracknell pub speaks out after image used on political leaflet \n\nhttps://t.co/HDVaf5KL61",
        "created_at": "2025-05-25 14:42:30"
    },
    {
        "tweet_id": 1926698992118710299,
        "author_id": 1106906560691929089,
        "url": "https://x.com/mike1101952/status/1926698992118710299",
        "tweet_content": "@reformexposed @Nigel_Farage Yet another bi-election win. Searched your posts but could not find it anywhere Latest win follows triumph for Reform in local elections and Runcorn and Helsby by-election https://t.co/TiFMsOOH9j",
        "created_at": "2025-05-25 17:56:50"
    },
    {
        "tweet_id": 1926698992118710299,
        "author_id": 1106906560691929089,
        "url": "https://x.com/mike1101952/status/1926698992118710299",
        "tweet_content": "@reformexposed @Nigel_Farage Yet another bi-election win. Searched your posts but could not find it anywhere Latest win follows triumph for Reform in local elections and Runcorn and Helsby by-election https://t.co/TiFMsOOH9j",
        "created_at": "2025-05-25 17:56:50"
    },
    {
        "tweet_id": 1926723758963794049,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926723758963794049",
        "tweet_content": "RT @reformexposed: Bracknell pub speaks out after image used on political leaflet \n\nhttps://t.co/HDVaf5KL61",
        "created_at": "2025-05-25 19:35:15"
    },
    {
        "tweet_id": 1926723810511745344,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926723810511745344",
        "tweet_content": "RT @reformexposed: Reform UK’s Lincolnshire County Councillor for Sleaford, and Executive Councillor for Adult Care and Health Steve Clegg…",
        "created_at": "2025-05-25 19:35:27"
    },
    {
        "tweet_id": 1926723867524968941,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926723867524968941",
        "tweet_content": "RT @reformexposed: Reform UK’s Councillor Desperate Dan Harrison, Leader of Leicestershire used to wear a rainbow lanyard when he was a Con…",
        "created_at": "2025-05-25 19:35:41"
    },
    {
        "tweet_id": 1926861894519844912,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926861894519844912",
        "tweet_content": "Climate change responsibility dropped from cabinet roles by new Reform administration In Lancashire\n\nhttps://t.co/2RvZ3zMN0u",
        "created_at": "2025-05-26 04:44:09"
    },
    {
        "tweet_id": 1926862276755100074,
        "author_id": 1539952499221794816,
        "url": "https://x.com/TheGazetteCoop/status/1926862276755100074",
        "tweet_content": "Reform's deputy leader in Leicestershire shared homophobic, sexist and Islamophobic content\n\nhttps://t.co/qNUqXVHX2O",
        "created_at": "2025-05-26 04:45:40"
    },
    {
        "tweet_id": 1926878144234983687,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926878144234983687",
        "tweet_content": "🚨 Reform's deputy leader in Leicestershire @Joseph_Boam shared homophobic, sexist and Islamophobic content.\n\nHe’s constantly doubled down on saying it’s ‘fake news’, but his lie is just getting bigger now. There’s even more now in this article:\n\nhttps://t.co/FL0HYQvcea",
        "created_at": "2025-05-26 05:48:43"
    },
    {
        "tweet_id": 1926930432794185798,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926930432794185798",
        "tweet_content": "Reform UK's Deputy for North West Leicestershire Council @Joseph_Boam quit the Conservatives calling them corrupt at a local level.\n\nYes, the local level where his own dad is a councillor. Harsh.\n\nWhilst we're on the subject of his dad Councillor Russell Boam, here's the time he and his dad had 'fun' putting a cardboard cutout of the Prime Minister on a bonfire.",
        "created_at": "2025-05-26 09:16:30"
    },
    {
        "tweet_id": 1926930432794185798,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926930432794185798",
        "tweet_content": "Reform UK's Deputy for North West Leicestershire Council @Joseph_Boam quit the Conservatives calling them corrupt at a local level.\n\nYes, the local level where his own dad is a councillor. Harsh.\n\nWhilst we're on the subject of his dad Councillor Russell Boam, here's the time he and his dad had 'fun' putting a cardboard cutout of the Prime Minister on a bonfire.",
        "created_at": "2025-05-26 09:16:30"
    },
    {
        "tweet_id": 1926947436267753711,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1926947436267753711",
        "tweet_content": "RT @reformexposed: 🚨 Reform's deputy leader in Leicestershire @Joseph_Boam shared homophobic, sexist and Islamophobic content.\n\nHe’s consta…",
        "created_at": "2025-05-26 10:24:04"
    },
    {
        "tweet_id": 1927082464150737152,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927082464150737152",
        "tweet_content": "RT @reformexposed: Reform UK's Deputy for North West Leicestershire Council @Joseph_Boam quit the Conservatives calling them corrupt at a l…",
        "created_at": "2025-05-26 19:20:37"
    },
    {
        "tweet_id": 1927082464150737152,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927082464150737152",
        "tweet_content": "RT @reformexposed: Reform UK's Deputy for North West Leicestershire Council @Joseph_Boam quit the Conservatives calling them corrupt at a l…",
        "created_at": "2025-05-26 19:20:37"
    },
    {
        "tweet_id": 1927247294300094794,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927247294300094794",
        "tweet_content": "RT @TheGazetteCoop: Reform's deputy leader in Leicestershire shared homophobic, sexist and Islamophobic content\n\nhttps://t.co/qNUqXVHX2O",
        "created_at": "2025-05-27 06:15:36"
    },
    {
        "tweet_id": 1927250623197597868,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927250623197597868",
        "tweet_content": "Reform UK’s Leader on West Northamptonshire Council Mark Arnull thinks his councillors don’t need training to treat people equally.\n\nThis is the same Mark Arnull that thinks it’s fine to have Ivan Dabbs as a councillor.\n\n@reformparty_uk is rotting. https://t.co/ms48CoEe3V",
        "created_at": "2025-05-27 06:28:49"
    },
    {
        "tweet_id": 1927251459571061181,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927251459571061181",
        "tweet_content": "In response to recent events in Blackpool we decided to rebrand as Raving Looney Party Coffee Shop\n\nhttps://t.co/AuvHmi43mX",
        "created_at": "2025-05-27 06:32:09"
    },
    {
        "tweet_id": 1927286392175939646,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927286392175939646",
        "tweet_content": "The newly elected Reform UK Devon County Councillor Neil Stevens (@Neil199164) for Alphington & Cowick, #Devon. \n\nHe has a business 'A Salon Called Hare Ltd' which went in to liquidation in March 2025. It owes over £74,000, including £7,000 to employees and no funds to it.\n\nPerhaps he should have focused on that and the people it employs, rather than running for Reform UK?\n\nhttps://t.co/Pf40Ezk8V3",
        "created_at": "2025-05-27 08:50:57"
    },
    {
        "tweet_id": 1927307459661578676,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927307459661578676",
        "tweet_content": "Luke Houghton has defected from the Conservatives to Reform UK. \n\nHe was only elected about 6 months ago. Seems there is no fanfare with his news. In his 'statement' he's claiming there's been personal attacks against him from the Worthing West Conservatives. Here's their statement.\n\nSeems like he's playing victim, because he can't defend his actions. The people that helped him get elected, are rightfully not happy.",
        "created_at": "2025-05-27 10:14:40"
    },
    {
        "tweet_id": 1927307459661578676,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927307459661578676",
        "tweet_content": "Luke Houghton has defected from the Conservatives to Reform UK. \n\nHe was only elected about 6 months ago. Seems there is no fanfare with his news. In his 'statement' he's claiming there's been personal attacks against him from the Worthing West Conservatives. Here's their statement.\n\nSeems like he's playing victim, because he can't defend his actions. The people that helped him get elected, are rightfully not happy.",
        "created_at": "2025-05-27 10:14:40"
    },
    {
        "tweet_id": 1927307459661578676,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927307459661578676",
        "tweet_content": "Luke Houghton has defected from the Conservatives to Reform UK. \n\nHe was only elected about 6 months ago. Seems there is no fanfare with his news. In his 'statement' he's claiming there's been personal attacks against him from the Worthing West Conservatives. Here's their statement.\n\nSeems like he's playing victim, because he can't defend his actions. The people that helped him get elected, are rightfully not happy.",
        "created_at": "2025-05-27 10:14:40"
    },
    {
        "tweet_id": 1927316461556478412,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927316461556478412",
        "tweet_content": "Reform UK’s new @LincolnshireCC Leader Sean Matthews (@LouthHcreformuk) has already u-turned.\n\nDay one, much confusion, an absolute shitshow.\n\nLincolnshire residents were promised that, if elected, he would cancel Lincolnshire’s involvement in the controversial Theddlethorpe nuclear waste project.\n\nHe's failed to deliver.",
        "created_at": "2025-05-27 10:50:26"
    },
    {
        "tweet_id": 1927323084199022765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927323084199022765",
        "tweet_content": "Trevor Jones (@ReformBolton) who was Reform UK's Parliamentary Candidate for Bolton North East and council candidate has been spreading untruths about Pride in Bolton, even suggesting it’s putting kids at risk. Here he says it's cost £75k and is poorly attended.\n\n£75k is 3 year funding for Pride and Bolton film festival, this includes bespoke training to help both organisations be self sufficient in 3 years. Once there's external funding and sponsorship, the funding can be reduced or removed completely.\n\nAnd turns out the event is well attended.\n\nExpect more of this from Reform councillors and candidates.",
        "created_at": "2025-05-27 11:16:45"
    },
    {
        "tweet_id": 1927323084199022765,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927323084199022765",
        "tweet_content": "Trevor Jones (@ReformBolton) who was Reform UK's Parliamentary Candidate for Bolton North East and council candidate has been spreading untruths about Pride in Bolton, even suggesting it’s putting kids at risk. Here he says it's cost £75k and is poorly attended.\n\n£75k is 3 year funding for Pride and Bolton film festival, this includes bespoke training to help both organisations be self sufficient in 3 years. Once there's external funding and sponsorship, the funding can be reduced or removed completely.\n\nAnd turns out the event is well attended.\n\nExpect more of this from Reform councillors and candidates.",
        "created_at": "2025-05-27 11:16:45"
    },
    {
        "tweet_id": 1927344385617793520,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927344385617793520",
        "tweet_content": "RT @reformexposed: Reform UK’s Leader on West Northamptonshire Council Mark Arnull thinks his councillors don’t need training to treat peop…",
        "created_at": "2025-05-27 12:41:24"
    },
    {
        "tweet_id": 1927344610134626698,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927344610134626698",
        "tweet_content": "RT @reformexposed: The newly elected Reform UK Devon County Councillor Neil Stevens (@Neil199164) for Alphington &amp; Cowick, #Devon. \n\nHe has…",
        "created_at": "2025-05-27 12:42:18"
    },
    {
        "tweet_id": 1927353598201016694,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927353598201016694",
        "tweet_content": "RT @reformexposed: Luke Houghton has defected from the Conservatives to Reform UK. \n\nHe was only elected about 6 months ago. Seems there is…",
        "created_at": "2025-05-27 13:18:00"
    },
    {
        "tweet_id": 1927380379519869148,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927380379519869148",
        "tweet_content": "RT @reformexposed: Trevor Jones (@ReformBolton) who was Reform UK's Parliamentary Candidate for Bolton North East and council candidate has…",
        "created_at": "2025-05-27 15:04:26"
    },
    {
        "tweet_id": 1927467424632230397,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927467424632230397",
        "tweet_content": "You’re saying Bolton Pride and Bolton Film Festival will have had only 150 people attend over 3 years of events?\n\nThe figure is actually £30-40k per event. \n\n£10k was rightfully given to VE Day events (which is for 1 year). So if you think that’s next to nothing, then you think the yearly amount given to Pride and Film is the same, surely?",
        "created_at": "2025-05-27 20:50:19"
    },
    {
        "tweet_id": 1927467424632230397,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927467424632230397",
        "tweet_content": "You’re saying Bolton Pride and Bolton Film Festival will have had only 150 people attend over 3 years of events?\n\nThe figure is actually £30-40k per event. \n\n£10k was rightfully given to VE Day events (which is for 1 year). So if you think that’s next to nothing, then you think the yearly amount given to Pride and Film is the same, surely?",
        "created_at": "2025-05-27 20:50:19"
    },
    {
        "tweet_id": 1927612359859654961,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927612359859654961",
        "tweet_content": "Seems @ReformNWL are dialling it in.\n\nDan Harrison, Leader of Reform UK Leicestershire cancelled the Council Cabinet meeting yesterday.\n\nSomething urgent? Nah, he wanted to see Nigel Farage speak. Sure the people of Leicestershire will be glad he’s focusing on local issues.\n\nYou can even see him on the front row on telly.\n\n@LeicsCountyHall",
        "created_at": "2025-05-28 06:26:14"
    },
    {
        "tweet_id": 1927612359859654961,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927612359859654961",
        "tweet_content": "Seems @ReformNWL are dialling it in.\n\nDan Harrison, Leader of Reform UK Leicestershire cancelled the Council Cabinet meeting yesterday.\n\nSomething urgent? Nah, he wanted to see Nigel Farage speak. Sure the people of Leicestershire will be glad he’s focusing on local issues.\n\nYou can even see him on the front row on telly.\n\n@LeicsCountyHall",
        "created_at": "2025-05-28 06:26:14"
    },
    {
        "tweet_id": 1927712227181920282,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927712227181920282",
        "tweet_content": "Councillor Ronald Hartle-Ryton (@ronryton) is Reform UK's Sherwood Forest Branch Chair. He recently become a parish councillor in Clipstone, Nottinghamshire.\n\nWe hope as Branch Chair Ron you will be voicing your opposition to the Reform UK policy of removing Pride flags from Council Buildings.",
        "created_at": "2025-05-28 13:03:04"
    },
    {
        "tweet_id": 1927749251771122096,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927749251771122096",
        "tweet_content": "RT @reformexposed: Seems @ReformNWL are dialling it in.\n\nDan Harrison, Leader of Reform UK Leicestershire cancelled the Council Cabinet mee…",
        "created_at": "2025-05-28 15:30:12"
    },
    {
        "tweet_id": 1927776885548646715,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927776885548646715",
        "tweet_content": "Jo Monk is Reform UK Group Leader on Worcestershire County Council. Seems she was lecturing about non-attendance being a sign of a lack of commitment.\n\nTurns out she's failed to attend Worcestershire County Council's Leaders Board. https://t.co/1MQxGnRSfr",
        "created_at": "2025-05-28 17:20:00"
    },
    {
        "tweet_id": 1927776885548646715,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927776885548646715",
        "tweet_content": "Jo Monk is Reform UK Group Leader on Worcestershire County Council. Seems she was lecturing about non-attendance being a sign of a lack of commitment.\n\nTurns out she's failed to attend Worcestershire County Council's Leaders Board. https://t.co/1MQxGnRSfr",
        "created_at": "2025-05-28 17:20:00"
    },
    {
        "tweet_id": 1927822404543295682,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927822404543295682",
        "tweet_content": "RT @reformexposed: Jo Monk is Reform UK Group Leader on Worcestershire County Council. Seems she was lecturing about non-attendance being a…",
        "created_at": "2025-05-28 20:20:53"
    },
    {
        "tweet_id": 1927959381640925530,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927959381640925530",
        "tweet_content": "Lichfield MP calls for SEND reassurances from new Reform UK county council leader \n\nhttps://t.co/yJZmSvzUCy",
        "created_at": "2025-05-29 05:25:10"
    },
    {
        "tweet_id": 1927982526762451017,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1927982526762451017",
        "tweet_content": "Nigel Farage Anywhere But Clacton World Tour\n\nToday: Bitcoin Conference, Las Vegas\n\n2024\nAug: Arizona USA\nSept: Chicago USA \nSept: Kuala Lumpur, Malaysia\nNov: Pennsylvania, USA\nDec: NYC, USA\nDec: Washington, DC, USA\n\n2025\nJan: Washington, DC, USA\nFeb: Washington, DC, USA\nMarch: Florida, USA\nMay: France\nMay: Las Vegas, USA\n\n#AnywhereButClacton",
        "created_at": "2025-05-29 06:57:09"
    },
    {
        "tweet_id": 1928017165547974869,
        "author_id": 1814750895978262529,
        "url": "https://x.com/ReformDaily_/status/1928017165547974869",
        "tweet_content": "🗳️It’s polling day in Castle Point!\n\nTime to make your voice heard loud & clear. If you’re in the area - head to the polls!\n\n✅ Back Reform UK\n🗳️ Vote Reece Langley\n\nEssex was shut out of May’s locals - Castle Point speaks for us all. Let’s send a message! 💪🇬🇧\n\n#ReformUK #CastlePoint #ByElection @SophiePrestonHa @mcgill_reform",
        "created_at": "2025-05-29 09:14:47"
    },
    {
        "tweet_id": 1928049586079191093,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928049586079191093",
        "tweet_content": "RT @reformexposed: Lichfield MP calls for SEND reassurances from new Reform UK county council leader \n\nhttps://t.co/yJZmSvzUCy",
        "created_at": "2025-05-29 11:23:37"
    },
    {
        "tweet_id": 1928097363597422944,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928097363597422944",
        "tweet_content": "RT @reformexposed: Nigel Farage Anywhere But Clacton World Tour\n\nToday: Bitcoin Conference, Las Vegas\n\n2024\nAug: Arizona USA\nSept: Chicago…",
        "created_at": "2025-05-29 14:33:28"
    },
    {
        "tweet_id": 1928100304353902717,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928100304353902717",
        "tweet_content": "@Nigel_Farage @TheBitcoinConf Trying to justify another jaunt to the USA, shame you don’t take Clacton seriously. https://t.co/XLPeKX8Aui",
        "created_at": "2025-05-29 14:45:09"
    },
    {
        "tweet_id": 1928100361023185126,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928100361023185126",
        "tweet_content": "Trying to justify another jaunt to the USA, shame you don’t take Clacton seriously.",
        "created_at": "2025-05-29 14:45:23"
    },
    {
        "tweet_id": 1928192778627940782,
        "author_id": 91078935,
        "url": "https://x.com/colder_sarcasm/status/1928192778627940782",
        "tweet_content": "BREAKING: Looking at the register of interests, Nigel Farage earned  of over £84,000 in Feb 2025 - doing 91 hours of work across 6 roles that don't include his role as party leader or as MP for Clacton!?!?\n\nAre the people of Clacton getting value for money?\n\n@reformexposed https://t.co/qlRtItxAtQ",
        "created_at": "2025-05-29 20:52:37"
    },
    {
        "tweet_id": 1928329695726100857,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928329695726100857",
        "tweet_content": "Warwickshire Reform’s lack of policies and leadership criticised \n\nhttps://t.co/UeHxHBEKb9",
        "created_at": "2025-05-30 05:56:40"
    },
    {
        "tweet_id": 1928337670435991653,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928337670435991653",
        "tweet_content": "Reform UK Warwickshire County councillor @_GeorgeFinch opposes children's care home.\n\nSpawns NIMBY legend. https://t.co/P1RtaD15mY",
        "created_at": "2025-05-30 06:28:22"
    },
    {
        "tweet_id": 1928408178514936098,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928408178514936098",
        "tweet_content": "RT @reformexposed: Warwickshire Reform’s lack of policies and leadership criticised \n\nhttps://t.co/UeHxHBEKb9",
        "created_at": "2025-05-30 11:08:32"
    },
    {
        "tweet_id": 1928408227068117428,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928408227068117428",
        "tweet_content": "RT @reformexposed: Reform UK Warwickshire County councillor @_GeorgeFinch opposes children's care home.\n\nSpawns NIMBY legend. https://t.co/…",
        "created_at": "2025-05-30 11:08:44"
    },
    {
        "tweet_id": 1928464739723825457,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928464739723825457",
        "tweet_content": "Rob Reaney (@reaneyandson) is Deputy Leader of Derbyshire County Council. He is admin of a toxic Facebook Group called: Bolsover Reform UK / Rob Reaney For Sutton\n\nhttps://t.co/q8x40xn8Wd\n\n@Derbyshirecc it's important you look in to this as his group is not doing the council's reputation any good.\n\nTake this post for example - he has allowed it to remain up on his group, despite it being 100% untrue and deeply racist.",
        "created_at": "2025-05-30 14:53:17"
    },
    {
        "tweet_id": 1928464739723825457,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928464739723825457",
        "tweet_content": "Rob Reaney (@reaneyandson) is Deputy Leader of Derbyshire County Council. He is admin of a toxic Facebook Group called: Bolsover Reform UK / Rob Reaney For Sutton\n\nhttps://t.co/q8x40xn8Wd\n\n@Derbyshirecc it's important you look in to this as his group is not doing the council's reputation any good.\n\nTake this post for example - he has allowed it to remain up on his group, despite it being 100% untrue and deeply racist.",
        "created_at": "2025-05-30 14:53:17"
    },
    {
        "tweet_id": 1928464739723825457,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928464739723825457",
        "tweet_content": "Rob Reaney (@reaneyandson) is Deputy Leader of Derbyshire County Council. He is admin of a toxic Facebook Group called: Bolsover Reform UK / Rob Reaney For Sutton\n\nhttps://t.co/q8x40xn8Wd\n\n@Derbyshirecc it's important you look in to this as his group is not doing the council's reputation any good.\n\nTake this post for example - he has allowed it to remain up on his group, despite it being 100% untrue and deeply racist.",
        "created_at": "2025-05-30 14:53:17"
    },
    {
        "tweet_id": 1928697795424206890,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928697795424206890",
        "tweet_content": "RT @reformexposed: Rob Reaney (@reaneyandson) is Deputy Leader of Derbyshire County Council. He is admin of a toxic Facebook Group called:…",
        "created_at": "2025-05-31 06:19:22"
    },
    {
        "tweet_id": 1928704420574863361,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928704420574863361",
        "tweet_content": "Reform UK Councillor Nat Vanstone, Broadclyst, Devon has suddenly appeared after it was pointed out that he (and 3 other Reform UK councillors failed to attend their inaugural council meeting). \n\nIn doing so he’s gaslighting Broadclyst residents and blaming his fellow councillors for Reform UK not getting portfolio slots.",
        "created_at": "2025-05-31 06:45:42"
    },
    {
        "tweet_id": 1928711776792682510,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928711776792682510",
        "tweet_content": "Reform UK Beckton and Royal Docks ‘Regional Champion’ Kay Tobin complaining about a hotel boat on Victoria docks making too much noise across the road from her Penthouse…\n\nWonder how much noise helicopters make when they land on her boat?\n\nhttps://t.co/0hDd6H2cFb",
        "created_at": "2025-05-31 07:14:55"
    },
    {
        "tweet_id": 1928762198173646929,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928762198173646929",
        "tweet_content": "RT @reformexposed: Reform UK Beckton and Royal Docks ‘Regional Champion’ Kay Tobin complaining about a hotel boat on Victoria docks making…",
        "created_at": "2025-05-31 10:35:17"
    },
    {
        "tweet_id": 1928762218805379557,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928762218805379557",
        "tweet_content": "RT @reformexposed: Reform UK Councillor Nat Vanstone, Broadclyst, Devon has suddenly appeared after it was pointed out that he (and 3 other…",
        "created_at": "2025-05-31 10:35:22"
    },
    {
        "tweet_id": 1928805091923886425,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928805091923886425",
        "tweet_content": "Tracey Dougherty, the first-ever Reform UK Staffordshire county councillor has had to resign her job due to a conflict of interest with her new committee chair role. https://t.co/LrubGgWz2Z",
        "created_at": "2025-05-31 13:25:44"
    },
    {
        "tweet_id": 1928807415727669661,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928807415727669661",
        "tweet_content": "Aberdeenshire councillor switched to Reform Scotland after being rejected as Tory candidate \n\nhttps://t.co/iHffuO9pcx",
        "created_at": "2025-05-31 13:34:58"
    },
    {
        "tweet_id": 1928808243813392757,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928808243813392757",
        "tweet_content": "The video is a Kent County Council one @darrengrimes_. https://t.co/13QPq67knn",
        "created_at": "2025-05-31 13:38:15"
    },
    {
        "tweet_id": 1928820024409506273,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928820024409506273",
        "tweet_content": "@Sapientia_GB @LeftHandedKeith @darrengrimes_ They lead Kent council, if it’s such a travesty, they can easily take it down. How is that misleading?",
        "created_at": "2025-05-31 14:25:04"
    },
    {
        "tweet_id": 1928862112220164308,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928862112220164308",
        "tweet_content": "RT @reformexposed: The video is a Kent County Council one @darrengrimes_. https://t.co/13QPq67knn",
        "created_at": "2025-05-31 17:12:18"
    },
    {
        "tweet_id": 1928862301567787318,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928862301567787318",
        "tweet_content": "RT @reformexposed: Aberdeenshire councillor switched to Reform Scotland after being rejected as Tory candidate \n\nhttps://t.co/iHffuO9pcx",
        "created_at": "2025-05-31 17:13:03"
    },
    {
        "tweet_id": 1928862314540793905,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928862314540793905",
        "tweet_content": "RT @reformexposed: Tracey Dougherty, the first-ever Reform UK Staffordshire county councillor has had to resign her job due to a conflict o…",
        "created_at": "2025-05-31 17:13:06"
    },
    {
        "tweet_id": 1928898780989895121,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1928898780989895121",
        "tweet_content": "Reform reveals Warwickshire County Council cabinet - but rivals rail at vacant post \n\nhttps://t.co/SWNMxIdm5u",
        "created_at": "2025-05-31 19:38:01"
    },
    {
        "tweet_id": 1929043016599179586,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929043016599179586",
        "tweet_content": "Reform UK Kent County Council.\n\nWorking for you one day, not day one. https://t.co/UpOLUHBYIL",
        "created_at": "2025-06-01 05:11:09"
    },
    {
        "tweet_id": 1929053142093554090,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929053142093554090",
        "tweet_content": "'Taking the p***': Far-right protest takes place in Bracknell town centre \n\nThe protestors conflate Afghan asylum seekers with illegal immigration and small boats. \n\nhttps://t.co/rAyWkjPKE3",
        "created_at": "2025-06-01 05:51:23"
    },
    {
        "tweet_id": 1929053828789272808,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929053828789272808",
        "tweet_content": "Farage has brought ‘racism and hatred’ to Hamilton by-election, says Swinney \n\nhttps://t.co/RlVFw0D0YP",
        "created_at": "2025-06-01 05:54:07"
    },
    {
        "tweet_id": 1929076995343728835,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929076995343728835",
        "tweet_content": "Reform UK’s Ian Duxbury, Councillor for Longridge, Lancashire said “People have had enough of the old system, they want something different, something fresh” upon being elected.\n\nBit rich coming from a Freemason.\n\n@LancashireCC can you confirm whether councillors in the county should declare their membership on their ROI?",
        "created_at": "2025-06-01 07:26:10"
    },
    {
        "tweet_id": 1929163143239856634,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929163143239856634",
        "tweet_content": "RT @reformexposed: Reform UK’s Ian Duxbury, Councillor for Longridge, Lancashire said “People have had enough of the old system, they want…",
        "created_at": "2025-06-01 13:08:30"
    },
    {
        "tweet_id": 1929163210659185008,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929163210659185008",
        "tweet_content": "RT @reformexposed: Farage has brought ‘racism and hatred’ to Hamilton by-election, says Swinney \n\nhttps://t.co/RlVFw0D0YP",
        "created_at": "2025-06-01 13:08:46"
    },
    {
        "tweet_id": 1929163222067580998,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929163222067580998",
        "tweet_content": "RT @reformexposed: 'Taking the p***': Far-right protest takes place in Bracknell town centre \n\nThe protestors conflate Afghan asylum seeker…",
        "created_at": "2025-06-01 13:08:48"
    },
    {
        "tweet_id": 1929163273825341680,
        "author_id": 20045947,
        "url": "https://x.com/reformexposed/status/1929163273825341680",
        "tweet_content": "RT @reformexposed: Reform UK Kent County Council.\n\nWorking for you one day, not day one. https://t.co/UpOLUHBYIL",
        "created_at": "2025-06-01 13:09:01"
    }
];


const Search = ({ setTweets }: SearchProps) => {
  const [constituency, setConstituency] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const appendTerm = async (constituency: string) => {
    const url = `${BASE_URL}/search?constituency=${constituency}}`;
    setTweets(tweets);
    // try {
    //   const response = await axios.get(url);
    //   console.log(
    //     `Found ${response.data.length} articles for ${constituency}.`
    //   );
    //   if (response.data?.length > 0) {
    //   }
    // } catch (error) {
    //   console.error(`Error fetching articles: ${error}`);
    // }
  };

  const getArticles = (constituency: string) => {
    console.log({constituency})
    if (!constituency) return;
    appendTerm(constituency);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        {/* Constituency Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="constituency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Constituency
          </label>
          {/* Use the Constituency component with autocomplete */}
          <Constituency className="grow" onSelect={setConstituency} />
        </div>

        {/* Search Button */}
        <Button
          onClick={() => getArticles(constituency)}
          className="px-8"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
