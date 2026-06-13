import copy
import json
from pathlib import Path

p = Path(r'd:\SvartulfrVerse\assets\ASSET_REGISTRY.json')
d = json.loads(p.read_text(encoding='utf-8'))
U = {}
K = {}

def f(o, path=()):
    if isinstance(o, dict):
        K['.'.join(path)] = o
        if o.get('web_url') and o.get('web_url') != '#':
            U[o['web_url']] = o
        for a, b in o.items():
            f(b, path + (a,))
    elif isinstance(o, list):
        for i, b in enumerate(o):
            f(b, path + (str(i),))

f(d)

jr_url = 'https://ella.janitorai.com/media-approved/jrRqqRXrm13-dU5aYqkmK.webp'
U[jr_url] = {
    'web_url': jr_url,
    'md_tag': '![A portrait of a young woman smiling, with long brown hair, wearing a yellow hoodie and delicate gold jewelry.](https://ella.janitorai.com/media-approved/jrRqqRXrm13-dU5aYqkmK.webp)',
    'trigger_keyword': "Alyssa's striking presence",
    'resolution': '1254x1254',
}

et_url = 'https://ella.janitorai.com/media-approved/eTbufISANQ5RsovFCmBcd.webp'
U[et_url] = {
    'web_url': et_url,
    'md_tag': '![A portrait of a woman wearing a yellow top on a patio.](https://ella.janitorai.com/media-approved/eTbufISANQ5RsovFCmBcd.webp)',
    'trigger_keyword': 'Alyssa patio portrait',
    'resolution': '300x300',
}

def u(url, tr=None):
    e = copy.deepcopy(U.pop(url))
    if tr:
        e['trigger_keyword'] = tr
    return e

def k(path, tr=None):
    e = copy.deepcopy(K[path])
    if tr:
        e['trigger_keyword'] = tr
    return e

def v(e, parent):
    e['variant_of'] = parent
    return e

def o(items):
    return {a: b for a, b in items if b is not None}

N = {'Character': {}, 'Protagonist': {}, 'Location': {}, 'Family': {}, 'Interface': {}}

def ch(name, items):
    N['Character'][name] = o(items)

ch('Alyssa', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/jrRqqRXrm13-dU5aYqkmK.webp', "Alyssa's striking presence")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/h8XWRy6ek1lLtZWYbUYMC.webp', 'Alyssa primary portrait'), 'Avatar_Primary')),
    ('Avatar_Secondary_1254', u('https://ella.janitorai.com/media-approved/HEn-F1GTrfAxSP6A4oNFO.webp', 'Alyssa sunflower portrait')),
    ('Avatar_Secondary_300', v(u('https://ella.janitorai.com/media-approved/8rd911kByqq893cTHDZRL.webp', 'Alyssa alternate portrait'), 'Avatar_Secondary_1254')),
    ('Icon_Wrist_Tattoo', u('https://ella.janitorai.com/media-approved/FDKY0tuStCm5A3S3_QeaG.webp', 'Alyssa wrist tattoo icon')),
    ('Scene_Emotional', u('https://ella.janitorai.com/media-approved/LSLCGZwAysP0ScaZGPReC.webp', 'Alyssa bracelet reflection')),
    ('Scene_Daily_Routine', u('https://ella.janitorai.com/media-approved/-dlWzlnpojIYpecE5OdBP.webp', 'Alyssa routine')),
    ('Scene_Daily_Routine_400x300', v(u('https://ella.janitorai.com/media-approved/UoZ--FO4VSk_7nNETtdEI.webp', 'Alyssa routine small'), 'Scene_Daily_Routine')),
    ('Scene_Lifestyle', u('https://ella.janitorai.com/media-approved/QBkxZnfU337MQxqld3GaZ.webp', 'Alyssa medical study')),
    ('Scene_Action_Volunteer', u('https://ella.janitorai.com/media-approved/73Ue3AuBXYilYyTPCR2ME.webp', 'Alyssa charity work')),
    ('Polaroid_Candid', u('https://ella.janitorai.com/media-approved/sGicPx1NJMGJ0fw-107ZQ.webp', 'Alyssa sociology polaroid')),
    ('Polaroid_Candid_Small', v(u('https://ella.janitorai.com/media-approved/c_HbzfXHvmbWFKz_DaCLO.webp', 'Alyssa sociology pocket photo'), 'Polaroid_Candid')),
    ('Alternative_Look_1254', u('https://ella.janitorai.com/media-approved/drQJYtuMBuxx76YRaasUy.webp', 'Alyssa terrace sunset')),
    ('Alternative_Look_300', v(u('https://ella.janitorai.com/media-approved/JdgW8XYh9IMfT70DT4Q7c.webp', 'Alyssa sunflower detail'), 'Alternative_Look_1254')),
    ('Portrait_Sunflower_Patio_300', u('https://ella.janitorai.com/media-approved/eTbufISANQ5RsovFCmBcd.webp', 'Alyssa patio portrait')),
])

ch('Erik', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/qziRZ5Fs2BugaH80j-RSY.webp', "Erik's authority")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/iSeawXWofchbdB0Kdu3f4.webp', 'Erik close-up'), 'Avatar_Primary')),
    ('Polaroid_Candid', u('https://ella.janitorai.com/media-approved/bbKAuJHUkz4ogBH6GG5ER.webp', 'Erik vintage photo')),
    ('Polaroid_Candid_Small', v(u('https://ella.janitorai.com/media-approved/RnLtz5h5ex-7B1CDWDXne.webp', 'Erik pocket photo'), 'Polaroid_Candid')),
    ('Scene_Lifestyle', k('Character.Erik.Scene_Lifestyle')),
    ('Scene_Emotional', k('Character.Erik.Scene_Emotional')),
])

ch('Jasper', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/FnwuWc0XPf5h9ul1o0R4i.webp', "Jasper's chaotic presence")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/bzWEdnhztxK-wyiWdYvGO.webp', 'Jasper close-up'), 'Avatar_Primary')),
    ('Scene_Action_DJSet', u('https://ella.janitorai.com/media-approved/0oH05-P2k-OF2y254Ib40.webp', 'Jasper mixing music')),
    ('Scene_Media_Montage', u('https://ella.janitorai.com/media-approved/EmGX5t9zBfoGLh75PW56l.webp', 'Jasper media montage')),
    ('Scene_Media_Montage_400x300', v(u('https://ella.janitorai.com/media-approved/WbzHrSqzm79BGnsXOSmIS.webp', 'Jasper media montage small'), 'Scene_Media_Montage')),
    ('Scene_Lifestyle', u('https://ella.janitorai.com/media-approved/-50-o-Nct-imghNsrp6FA.webp', 'Jasper rooftop laptop')),
    ('Scene_Rooftop_Night', u('https://ella.janitorai.com/media-approved/mnYI_xnOXYqs0Mr3FlUT5.webp', 'Jasper rooftop night')),
    ('Polaroid_Candid', u('https://ella.janitorai.com/media-approved/ijeMCAA3v1Ppvg520TvH9.webp', 'Jasper vintage photo')),
    ('Polaroid_Candid_Small', v(u('https://ella.janitorai.com/media-approved/pag_8qUSoP9Oxdj2ZoOfm.webp', 'Jasper pocket photo'), 'Polaroid_Candid')),
])

ch('Logan', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/Jd4-jka2ASnjS9romOGfg.webp', "Logan's calm presence")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/mj58rjJAATO24WmBmn9Mn.webp', 'Logan close-up'), 'Avatar_Primary')),
    ('Polaroid_Bartender_Verve', u('https://ella.janitorai.com/media-approved/ZhTzNOBazY6cjfMLq_Vhz.webp', 'Logan bartender polaroid')),
    ('Polaroid_Uncle_Lo_400', v(u('https://ella.janitorai.com/media-approved/_GnXrheeRCezC7xfbrQGN.webp', 'Logan Uncle Lo polaroid'), 'Polaroid_Bartender_Verve')),
    ('Scene_Lifestyle', k('Character.Logan.Scene_Lifestyle')),
    ('Scene_Emotional', k('Character.Logan.Scene_Emotional')),
])

ch('Malachia', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/--XzWEO1b3jpfg9Mxhx2m.webp', "Malachia's lethal presence")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/qpoLB-bIeL50l38h3F5xm.webp', 'Malachia close-up'), 'Avatar_Primary')),
    ('Avatar_Secondary_1254', u('https://ella.janitorai.com/media-approved/eLn0pvT3XIp0i-kxcE0Zt.webp', 'Malachia observing')),
    ('Avatar_Secondary_300', v(u('https://ella.janitorai.com/media-approved/624ZUTmqRWbNDHNtV2VGB.webp', 'Malachia alternate portrait'), 'Avatar_Secondary_1254')),
    ('Polaroid_Candid', u('https://ella.janitorai.com/media-approved/ag32_WSbKvasFMuAvmhGh.webp', 'Malachia gym polaroid')),
    ('Polaroid_Candid_Small', v(u('https://ella.janitorai.com/media-approved/lifei_PV6fMzLP8DQgA6l.webp', 'Malachia pocket photo'), 'Polaroid_Candid')),
    ('Scene_Lifestyle', k('Character.Malachia.Scene_Lifestyle')),
    ('Scene_Emotional', k('Character.Malachia.Scene_Emotional')),
])

ch('Noah', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/aQIh3JIIkqvxBiznj2ecV.webp', "Noah's bright presence")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/wnyfIMWngJAwXvTGDk_tY.webp', 'Noah close-up'), 'Avatar_Primary')),
    ('Polaroid_Candid', u('https://ella.janitorai.com/media-approved/ZLs0QyojTn7Cvhqw4lP4H.webp', 'Noah vintage photo')),
    ('Polaroid_Candid_Small', v(u('https://ella.janitorai.com/media-approved/h7cdrBjxkQawzc8VUz_95.webp', 'Noah pocket photo'), 'Polaroid_Candid')),
    ('Scene_Lifestyle', k('Character.Noah.Scene_Lifestyle')),
    ('Scene_Emotional', k('Character.Noah.Scene_Emotional')),
])

ch('Wulfnic', [
    ('Avatar_Primary', u('https://ella.janitorai.com/media-approved/4PRQ0NKkfAylAtUM5xMF0.webp', "Wulfnic's imposing presence")),
    ('Avatar_Primary_300', v(u('https://ella.janitorai.com/media-approved/Gd1iDKN05O3HeiHXuqnFo.webp', 'Wulfnic close-up'), 'Avatar_Primary')),
    ('Polaroid_Candid', u('https://ella.janitorai.com/media-approved/a8AYrT7DHhWYp2clgwqbR.webp', 'Wulfnic vintage photo')),
    ('Polaroid_Candid_Small', v(u('https://ella.janitorai.com/media-approved/Rz2h_zdTgc16ngBzvHaOf.webp', 'Wulfnic pocket photo'), 'Polaroid_Candid')),
    ('Scene_Lifestyle', k('Character.Wulfnic.Scene_Lifestyle')),
    ('Scene_Emotional', k('Character.Wulfnic.Scene_Emotional')),
])

N['Protagonist']['Caleum_Persona'] = u('https://ella.janitorai.com/media-approved/Pt2Sov_3jF95HTXXxbsxD.webp', "Caleum's appearance")

N['Location'] = o([
    ('Exterior_Bloodmoon_Estate', u('https://ella.janitorai.com/media-approved/rtCarJZTeMxm7OzXcLa2C.webp', 'estate exterior')),
    ('Exterior_Beverly_Hills_Neighborhood', u('https://ella.janitorai.com/media-approved/36mlQdA9q56DcYlaJakoN.webp', 'beverly hills neighborhood')),
    ('Exterior_Beverly_Hills_Street', u('https://ella.janitorai.com/media-approved/B-XvIkerQaUft_MRPPFQ4.webp', 'beverly hills street')),
    ('Exterior_UCLA_Campus', u('https://ella.janitorai.com/media-approved/UvG5alMlEmZyAA7oSrx-D.webp', 'ucla grounds')),
    ('Interior_Bloodmoon_Garage_Bar', u('https://ella.janitorai.com/media-approved/xB6GVo6KEfeOio3B2h7ga.webp', 'bloodmoon garage bar')),
])

N['Family'] = o([
    ('Portrait_Family_Study', u('https://ella.janitorai.com/media-approved/zrklLQsO0dldHUsxXmxPW.webp', 'family study portrait')),
    ('Portrait_Residential_Property', u('https://ella.janitorai.com/media-approved/dxQqAJ3ILHGIsCbGckR3L.webp', 'residential property group')),
    ('Dinner_Gathering', u('https://ella.janitorai.com/media-approved/JuLtgEfhNNv81XUQfBpMs.webp', 'family dinner gathering')),
    ('Duo_Alyssa_Jasper', o([
        ('Polaroid_Couple_Candid', u('https://ella.janitorai.com/media-approved/kmNJwtwHV8hkfns1tV-Dj.webp', 'Alyssa and Jasper together')),
        ('Polaroid_Couple_Medium', v(u('https://ella.janitorai.com/media-approved/c9FCUUXjm27b7CrK2vr_U.webp', 'Alyssa Jasper dynamic'), 'Polaroid_Couple_Candid')),
        ('Polaroid_Couple_Small', v(u('https://ella.janitorai.com/media-approved/aitDaGq6slPSzyLUzCRyy.webp', 'Alyssa Jasper memory'), 'Polaroid_Couple_Candid')),
    ])),
])

N['Interface'] = o([
    ('Banner_Hero_Main', u('https://ella.janitorai.com/media-approved/BDghYj8fEgjnAo28h3yEB.webp', 'system hero banner')),
    ('Banner_Keyword_Divider', u('https://ella.janitorai.com/media-approved/1-QfBZZ4KAX7fidRlidxq.webp', 'beverly hills divider')),
])

if U:
    raise SystemExit('Unused URL entries remain: ' + ', '.join(sorted(U)))

p.write_text(json.dumps(N, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
