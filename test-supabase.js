// Test Supabase connection from Node.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://eksufbewfgepqklfetoc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrc3VmYmV3ZmdlcHFrbGZldG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MDQ1NTcsImV4cCI6MjA3ODQ4MDU1N30.xLILNZZCQbw1uvK0LzQDi5mvHOyXR8F1sJU-3J8wq74';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSupabase() {
    console.log('🧪 Testing Supabase Connection...\n');
    
    // Test 1: Check error_logs table
    console.log('📋 Test 1: Fetching error logs...');
    const { data: errors, error: errorLogError } = await supabase
        .from('error_logs')
        .select('*')
        .limit(5);
    
    if (errorLogError) {
        console.log('❌ Error logs query failed:', errorLogError.message);
    } else {
        console.log(`✅ Error logs table accessible: ${errors.length} records found`);
        if (errors.length > 0) {
            console.log('   Latest error:', errors[0].error_type);
        }
    }
    
    // Test 2: Check users table
    console.log('\n📋 Test 2: Fetching users...');
    const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, email, name, role')
        .limit(5);
    
    if (usersError) {
        console.log('❌ Users query failed:', usersError.message);
    } else {
        console.log(`✅ Users table accessible: ${users.length} records found`);
        users.forEach(u => console.log(`   - ${u.name} (${u.role})`));
    }
    
    // Test 3: Check deals table
    console.log('\n📋 Test 3: Fetching deals...');
    const { data: deals, error: dealsError } = await supabase
        .from('deals')
        .select('id, status, rate')
        .limit(5);
    
    if (dealsError) {
        console.log('❌ Deals query failed:', dealsError.message);
    } else {
        console.log(`✅ Deals table accessible: ${deals.length} records found`);
    }
    
    // Test 4: Check messages table
    console.log('\n📋 Test 4: Fetching messages...');
    const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('id, message, sender_role')
        .limit(5);
    
    if (messagesError) {
        console.log('❌ Messages query failed:', messagesError.message);
    } else {
        console.log(`✅ Messages table accessible: ${messages.length} records found`);
    }
    
    // Test 5: Try to insert a test error log
    console.log('\n📋 Test 5: Inserting test error log...');
    const { data: insertData, error: insertError } = await supabase
        .from('error_logs')
        .insert([{
            error_type: 'test_from_cli',
            error_message: 'Test error from Node.js CLI',
            user_role: 'system',
            context: { test: true, source: 'node_cli' }
        }])
        .select();
    
    if (insertError) {
        console.log('❌ Insert failed:', insertError.message);
    } else {
        console.log('✅ Insert successful! Error log created with ID:', insertData[0].id);
    }
    
    console.log('\n✅ Supabase testing complete!');
}

testSupabase().catch(console.error);
